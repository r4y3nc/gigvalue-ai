import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
 
# ─── PAGE CONFIG ─────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Freelance Market Dashboard",
    page_icon="💼",
    layout="wide",
    initial_sidebar_state="expanded",
)
 
# ─── CUSTOM CSS ──────────────────────────────────────────────────────────────
st.markdown("""
<style>
    .main { background-color: #0f1117; }
    .block-container { padding-top: 1.5rem; padding-bottom: 1rem; }
    .metric-card {
        background: linear-gradient(135deg, #1e2130 0%, #262d40 100%);
        border: 1px solid #2e3651;
        border-radius: 12px;
        padding: 1.2rem 1.5rem;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .metric-card .label { color: #8b95b0; font-size: 0.78rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
    .metric-card .value { color: #e8eaf6; font-size: 1.9rem; font-weight: 700; line-height: 1.1; }
    .metric-card .delta { font-size: 0.78rem; margin-top: 0.25rem; }
    .section-header {
        color: #c5cae9;
        font-size: 1.05rem;
        font-weight: 600;
        margin-top: 1.2rem;
        margin-bottom: 0.6rem;
        padding-left: 0.1rem;
        border-left: 3px solid #5c6bc0;
        padding-left: 0.6rem;
    }
    .insight-box {
        background: linear-gradient(135deg, #1a2744 0%, #1e2a4a 100%);
        border: 1px solid #2e4080;
        border-left: 4px solid #5c6bc0;
        border-radius: 8px;
        padding: 0.9rem 1.2rem;
        margin-top: 0.6rem;
        color: #b0bec5;
        font-size: 0.85rem;
        line-height: 1.6;
    }
    .insight-box b { color: #90caf9; }
    div[data-testid="stMetric"] { display: none; }
    .stSelectbox label, .stMultiSelect label, .stSlider label { color: #8b95b0 !important; font-size: 0.82rem !important; }
    h1 { color: #e8eaf6 !important; }
    h2, h3 { color: #c5cae9 !important; }
    .sidebar-title { color: #7986cb; font-weight: 700; font-size: 0.9rem;
        text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.8rem; }
    .stTabs [data-baseweb="tab"] { color: #8b95b0; font-weight: 500; }
    .stTabs [aria-selected="true"] { color: #7986cb !important; }
</style>
""", unsafe_allow_html=True)
 
# ─── LOAD DATA ───────────────────────────────────────────────────────────────
@st.cache_data
def load_data():
    df = pd.read_csv("freelance_clean.csv")
 
    # Bersihkan & derive kolom berguna
    df["avg_hourly_usd"] = (df["min_hourly_usd"] + df["max_hourly_usd"]) / 2
 
    # Simplify category: ambil keyword pertama
    def simplify_category(cat):
        if pd.isna(cat):
            return "Other"
        first = str(cat).split(",")[0].strip()
        return first if len(first) <= 35 else first[:35]
 
    df["category_simple"] = df["category"].apply(simplify_category)
 
    # Normalize experience level
    df["experience_level"] = df["experience_level"].fillna("Unknown")
 
    return df
 
df = load_data()
 
# ─── SIDEBAR FILTERS ─────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown('<div class="sidebar-title">🔧 Filter Data</div>', unsafe_allow_html=True)
 
    # Experience Level
    exp_options = ["All"] + sorted(df["experience_level"].unique().tolist())
    selected_exp = st.multiselect(
        "Experience Level",
        options=exp_options[1:],
        default=exp_options[1:],
    )
    if not selected_exp:
        selected_exp = exp_options[1:]
 
    # Country filter
    top_countries = df["country"].value_counts().head(15).index.tolist()
    country_options = ["All Countries"] + top_countries
    selected_country = st.selectbox("Country", country_options)
 
    # Hourly Rate Range
    rate_min = int(df["target_hourly_rate_usd"].min())
    rate_max = int(df["target_hourly_rate_usd"].max())
    rate_range = st.slider(
        "Target Hourly Rate (USD)",
        min_value=rate_min,
        max_value=min(rate_max, 300),
        value=(rate_min, min(200, rate_max)),
        step=5,
    )
 
    st.markdown("---")
    st.markdown('<div class="sidebar-title">ℹ️ Dataset Info</div>', unsafe_allow_html=True)
    st.markdown(f"<span style='color:#8b95b0;font-size:0.8rem;'>Total Records: <b style='color:#c5cae9'>{len(df):,}</b></span>", unsafe_allow_html=True)
    st.markdown(f"<span style='color:#8b95b0;font-size:0.8rem;'>Countries: <b style='color:#c5cae9'>{df['country'].nunique()}</b></span>", unsafe_allow_html=True)
    st.markdown(f"<span style='color:#8b95b0;font-size:0.8rem;'>Unique Skills: <b style='color:#c5cae9'>{df['category_simple'].nunique()}</b></span>", unsafe_allow_html=True)
 
# ─── APPLY FILTERS ───────────────────────────────────────────────────────────
dff = df[
    (df["experience_level"].isin(selected_exp)) &
    (df["target_hourly_rate_usd"] >= rate_range[0]) &
    (df["target_hourly_rate_usd"] <= rate_range[1])
]
if selected_country != "All Countries":
    dff = dff[dff["country"] == selected_country]
 
# ─── PLOTLY TEMPLATE ─────────────────────────────────────────────────────────
TEMPLATE = "plotly_dark"
COLORS = ["#5c6bc0", "#42a5f5", "#66bb6a", "#ef5350", "#ffa726", "#ab47bc", "#26c6da"]
COLOR_MAP = {
    "Entry level": "#66bb6a",
    "Intermediate": "#42a5f5",
    "Expert": "#5c6bc0",
    "Unknown": "#78909c",
}
 
# ─── HEADER ──────────────────────────────────────────────────────────────────
st.markdown("# 💼 Freelance Market Analytics Dashboard")
st.markdown(
    "<p style='color:#6b7280;font-size:0.9rem;margin-top:-0.5rem;margin-bottom:1rem;'>"
    "Analisis pasar freelance berdasarkan tarif, keahlian, dan pengalaman",
    unsafe_allow_html=True,
)
 
# ─── KPI CARDS ───────────────────────────────────────────────────────────────
k1, k2, k3, k4, k5 = st.columns(5)
 
def metric_card(col, label, value, delta=""):
    col.markdown(
        f"""<div class="metric-card">
            <div class="label">{label}</div>
            <div class="value">{value}</div>
            <div class="delta" style="color:#78909c;">{delta}</div>
        </div>""",
        unsafe_allow_html=True,
    )
 
avg_rate = dff["target_hourly_rate_usd"].mean()
median_rate = dff["target_hourly_rate_usd"].median()
avg_min = dff["min_hourly_usd"].mean()
avg_max = dff["max_hourly_usd"].mean()
top_country = dff["country"].value_counts().idxmax() if len(dff) > 0 else "-"
pct_expert = (dff["experience_level"] == "Expert").mean() * 100 if len(dff) > 0 else 0
 
metric_card(k1, "Avg Target Rate", f"${avg_rate:.0f}/hr", f"Median ${median_rate:.0f}")
metric_card(k2, "Rate Range", f"${avg_min:.0f}–${avg_max:.0f}", "Avg min–max range")
metric_card(k3, "Total Postings", f"{len(dff):,}", f"of {len(df):,} total")
metric_card(k4, "Expert Freelancers", f"{pct_expert:.1f}%", "of filtered set")
metric_card(k5, "Top Country", top_country, f"{dff['country'].value_counts().iloc[0]:,} postings" if len(dff)>0 else "")
 
st.markdown("---")
 
# ─── TABS ────────────────────────────────────────────────────────────────────
tab1, tab2, tab3, tab4 = st.tabs([
    "📊 Distribusi & Pasar",
    "💡 BQ1: Rate vs Volume",
    "🔍 BQ2: Faktor Pendapatan",
    "🌍 Analisis Geografis",
])
 
# ══════════════════════════════════════════════════════════════════════════════
# TAB 1 – Distribusi & Pasar
# ══════════════════════════════════════════════════════════════════════════════
with tab1:
    col_a, col_b = st.columns(2)
 
    # 1a. Histogram distribusi target hourly rate
    with col_a:
        st.markdown('<div class="section-header">Distribusi Target Hourly Rate</div>', unsafe_allow_html=True)
        rate_data = dff[dff["target_hourly_rate_usd"] <= 250]["target_hourly_rate_usd"]
        fig = px.histogram(
            rate_data, nbins=60,
            color_discrete_sequence=["#5c6bc0"],
            labels={"value": "Target Hourly Rate (USD)", "count": "Jumlah Posting"},
            template=TEMPLATE,
        )
        fig.add_vline(x=rate_data.median(), line_dash="dash", line_color="#ffa726",
                      annotation_text=f"Median ${rate_data.median():.0f}", annotation_font_color="#ffa726")
        fig.add_vline(x=rate_data.mean(), line_dash="dot", line_color="#ef5350",
                      annotation_text=f"Mean ${rate_data.mean():.0f}", annotation_font_color="#ef5350")
        fig.update_layout(showlegend=False, height=320, margin=dict(t=20, b=40, l=40, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
        st.markdown(
            "<div class='insight-box'>📌 Distribusi tarif <b>right-skewed</b>: mayoritas freelancer memasang "
            "tarif di kisaran <b>$10–$50/jam</b>. Segmen premium (>$100) lebih sedikit namun signifikan.</div>",
            unsafe_allow_html=True,
        )
 
    # 1b. Experience Level Breakdown
    with col_b:
        st.markdown('<div class="section-header">Komposisi Experience Level</div>', unsafe_allow_html=True)
        exp_counts = dff["experience_level"].value_counts().reset_index()
        exp_counts.columns = ["level", "count"]
        fig = px.pie(
            exp_counts, names="level", values="count",
            color="level",
            color_discrete_map=COLOR_MAP,
            hole=0.55,
            template=TEMPLATE,
        )
        fig.update_traces(textinfo="percent+label", textfont_size=12)
        fig.update_layout(height=320, margin=dict(t=20, b=20, l=20, r=20),
                          showlegend=True, legend=dict(orientation="h", yanchor="bottom", y=-0.15),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
        st.markdown(
            "<div class='insight-box'>📌 <b>Intermediate</b> mendominasi pasar (~49%), diikuti <b>Expert</b> (~38%). "
            "Entry level relatif sedikit, menandakan pasar lebih mature.</div>",
            unsafe_allow_html=True,
        )
 
    st.markdown("---")
 
    col_c, col_d = st.columns(2)
 
    # 1c. Box plot rate by experience
    with col_c:
        st.markdown('<div class="section-header">Hourly Rate per Experience Level</div>', unsafe_allow_html=True)
        bp_data = dff[dff["target_hourly_rate_usd"] <= 250]
        fig = px.box(
            bp_data, x="experience_level", y="target_hourly_rate_usd",
            color="experience_level",
            color_discrete_map=COLOR_MAP,
            labels={"target_hourly_rate_usd": "Target Rate (USD)", "experience_level": ""},
            template=TEMPLATE,
            category_orders={"experience_level": ["Entry level", "Intermediate", "Expert"]},
        )
        fig.update_layout(showlegend=False, height=320, margin=dict(t=20, b=40, l=40, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
    # 1d. Top 15 skills by avg rate
    with col_d:
        st.markdown('<div class="section-header">Top 15 Skill dengan Rata-rata Rate Tertinggi</div>', unsafe_allow_html=True)
        skill_rate = (
            dff[dff["target_hourly_rate_usd"] <= 300]
            .groupby("category_simple")["target_hourly_rate_usd"]
            .agg(["mean", "count"])
            .reset_index()
        )
        skill_rate = skill_rate[skill_rate["count"] >= 10].sort_values("mean", ascending=True).tail(15)
        fig = px.bar(
            skill_rate, x="mean", y="category_simple",
            orientation="h",
            color="mean",
            color_continuous_scale="Blues",
            labels={"mean": "Avg Rate (USD)", "category_simple": ""},
            template=TEMPLATE,
        )
        fig.update_layout(coloraxis_showscale=False, height=320,
                          margin=dict(t=20, b=40, l=10, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
# ══════════════════════════════════════════════════════════════════════════════
# TAB 2 – BQ1: Pengaruh Hourly Rate terhadap Volume Pekerjaan
# ══════════════════════════════════════════════════════════════════════════════
with tab2:
    st.markdown("### 🎯 BQ1: Bagaimana Hourly Rate Mempengaruhi Volume Pekerjaan?")
    st.markdown(
        "<p style='color:#6b7280;font-size:0.87rem;'>"
        "Menganalisis hubungan antara <b style='color:#90caf9'>target tarif per jam</b> yang ditetapkan freelancer "
        "dengan distribusi <b style='color:#90caf9'>tingkat experience</b> dan posisi di pasar."
        "</p>",
        unsafe_allow_html=True,
    )
 
    col1, col2 = st.columns([3, 2])
 
    with col1:
        st.markdown('<div class="section-header">Distribusi Rate per Experience Level (Violin)</div>', unsafe_allow_html=True)
        vln_data = dff[dff["target_hourly_rate_usd"] <= 250]
        fig = px.violin(
            vln_data,
            x="experience_level",
            y="target_hourly_rate_usd",
            color="experience_level",
            box=True,
            points=False,
            color_discrete_map=COLOR_MAP,
            labels={"target_hourly_rate_usd": "Target Hourly Rate (USD)", "experience_level": ""},
            template=TEMPLATE,
            category_orders={"experience_level": ["Entry level", "Intermediate", "Expert"]},
        )
        fig.update_layout(showlegend=False, height=380, margin=dict(t=20, b=40, l=40, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
    with col2:
        st.markdown('<div class="section-header">Rata-rata Rate per Level</div>', unsafe_allow_html=True)
        exp_summary = (
            dff[dff["target_hourly_rate_usd"] <= 250]
            .groupby("experience_level")["target_hourly_rate_usd"]
            .agg(["mean", "median", "count"])
            .reset_index()
            .sort_values("mean", ascending=True)
        )
        exp_summary.columns = ["Level", "Avg Rate", "Median Rate", "Count"]
        fig = px.bar(
            exp_summary, y="Level", x="Avg Rate",
            orientation="h",
            color="Level",
            color_discrete_map=COLOR_MAP,
            text=exp_summary["Avg Rate"].apply(lambda x: f"${x:.0f}"),
            template=TEMPLATE,
        )
        fig.update_traces(textposition="outside")
        fig.update_layout(showlegend=False, height=220, margin=dict(t=20, b=20, l=10, r=60),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
        # Stats table
        st.dataframe(
            exp_summary.set_index("Level").style.format({
                "Avg Rate": "${:.1f}",
                "Median Rate": "${:.1f}",
                "Count": "{:,}",
            }).background_gradient(subset=["Avg Rate"], cmap="Blues"),
            use_container_width=True,
        )
 
    # Rate band analysis
    st.markdown('<div class="section-header">Analisis Band Tarif: Komposisi Experience per Segmen Rate</div>', unsafe_allow_html=True)
 
    band_data = dff[dff["target_hourly_rate_usd"] <= 250].copy()
    bins = [0, 15, 30, 50, 75, 100, 150, 250]
    labels_b = ["$0–15", "$15–30", "$30–50", "$50–75", "$75–100", "$100–150", "$150+"]
    band_data["rate_band"] = pd.cut(band_data["target_hourly_rate_usd"], bins=bins, labels=labels_b)
 
    band_exp = (
        band_data.groupby(["rate_band", "experience_level"], observed=True)
        .size()
        .reset_index(name="count")
    )
    band_total = band_data.groupby("rate_band", observed=True).size().reset_index(name="total")
    band_exp = band_exp.merge(band_total, on="rate_band")
    band_exp["pct"] = band_exp["count"] / band_exp["total"] * 100
 
    fig = px.bar(
        band_exp, x="rate_band", y="pct",
        color="experience_level",
        color_discrete_map=COLOR_MAP,
        labels={"rate_band": "Rate Band", "pct": "% Freelancers", "experience_level": "Level"},
        template=TEMPLATE,
        barmode="stack",
        category_orders={"experience_level": ["Entry level", "Intermediate", "Expert", "Unknown"]},
    )
    fig.update_layout(height=320, margin=dict(t=20, b=40, l=40, r=20),
                      plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
                      legend=dict(orientation="h", yanchor="bottom", y=1.02))
    st.plotly_chart(fig, use_container_width=True)
 
    st.markdown(
        "<div class='insight-box'>"
        "📌 <b>Insight BQ1:</b> Seiring naiknya band tarif, proporsi <b>Expert</b> meningkat drastis"
        "di segmen $100+/jam, Expert mendominasi lebih dari separuh posting. "
        "Sebaliknya, Entry Level terkonsentrasi di segmen $0–$30/jam. "
        "Ini mengkonfirmasi bahwa <b>experience level adalah penentu utama pricing power</b> freelancer di pasar."
        "</div>",
        unsafe_allow_html=True,
    )
 
# ══════════════════════════════════════════════════════════════════════════════
# TAB 3 – BQ2: Faktor Pendapatan
# ══════════════════════════════════════════════════════════════════════════════
with tab3:
    st.markdown("### 🔍 BQ2: Faktor-Faktor yang Mempengaruhi Pendapatan Freelancer")
    st.markdown(
        "<p style='color:#6b7280;font-size:0.87rem;'>"
        "Menggali faktor seperti skill, lokasi, dan experience yang secara kuantitatif "
        "berkorelasi dengan <b style='color:#90caf9'>target hourly rate</b> sebagai proxy pendapatan."
        "</p>",
        unsafe_allow_html=True,
    )
 
    col1, col2 = st.columns(2)
 
    # Correlation heatmap (numeric columns)
    with col1:
        st.markdown('<div class="section-header">Korelasi Antar Variabel Numerik</div>', unsafe_allow_html=True)
        num_cols = ["min_hourly_usd", "max_hourly_usd", "target_hourly_rate_usd",
                    "client_rating", "freelancer_rating"]
        corr_df = dff[num_cols].dropna().corr()
        labels_corr = {
            "min_hourly_usd": "Min Rate",
            "max_hourly_usd": "Max Rate",
            "target_hourly_rate_usd": "Target Rate",
            "client_rating": "Client Rating",
            "freelancer_rating": "FL Rating",
        }
        corr_df.index = [labels_corr.get(c, c) for c in corr_df.index]
        corr_df.columns = [labels_corr.get(c, c) for c in corr_df.columns]
 
        fig = go.Figure(go.Heatmap(
            z=corr_df.values,
            x=corr_df.columns.tolist(),
            y=corr_df.index.tolist(),
            colorscale="RdBu",
            zmid=0,
            text=np.round(corr_df.values, 2),
            texttemplate="%{text}",
            textfont_size=11,
            colorbar=dict(thickness=12),
        ))
        fig.update_layout(template=TEMPLATE, height=320,
                          margin=dict(t=20, b=20, l=20, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
    # Scatter: min vs target rate
    with col2:
        st.markdown('<div class="section-header">Min Rate vs Target Rate (by Experience)</div>', unsafe_allow_html=True)
        scat_data = dff[
            (dff["target_hourly_rate_usd"] <= 200) &
            (dff["min_hourly_usd"] <= 150)
        ].sample(min(3000, len(dff)), random_state=42)
 
        fig = px.scatter(
            scat_data, x="min_hourly_usd", y="target_hourly_rate_usd",
            color="experience_level",
            color_discrete_map=COLOR_MAP,
            opacity=0.5,
            trendline="ols",
            trendline_scope="overall",
            labels={"min_hourly_usd": "Min Hourly Rate (USD)", "target_hourly_rate_usd": "Target Rate (USD)"},
            template=TEMPLATE,
        )
        fig.update_layout(height=320, margin=dict(t=20, b=40, l=40, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
                          legend=dict(orientation="h", yanchor="bottom", y=1.02, font_size=10))
        st.plotly_chart(fig, use_container_width=True)
 
    st.markdown("---")
 
    col3, col4 = st.columns(2)
 
    # Top skills by rate
    with col3:
        st.markdown('<div class="section-header">Distribusi Rate: Top 10 Skill Tertinggi vs Terendah</div>', unsafe_allow_html=True)
        skill_agg = (
            dff[dff["target_hourly_rate_usd"] <= 300]
            .groupby("category_simple")["target_hourly_rate_usd"]
            .agg(["mean", "count"])
            .reset_index()
        )
        skill_agg = skill_agg[skill_agg["count"] >= 15]
 
        top10 = skill_agg.nlargest(10, "mean")[["category_simple", "mean"]].assign(tier="Top 10")
        bot10 = skill_agg.nsmallest(10, "mean")[["category_simple", "mean"]].assign(tier="Bottom 10")
        combined = pd.concat([top10, bot10])
 
        fig = px.bar(
            combined.sort_values("mean"),
            x="mean", y="category_simple",
            color="tier",
            color_discrete_map={"Top 10": "#5c6bc0", "Bottom 10": "#ef5350"},
            orientation="h",
            labels={"mean": "Avg Target Rate (USD)", "category_simple": "", "tier": ""},
            template=TEMPLATE,
        )
        fig.update_layout(height=380, margin=dict(t=20, b=40, l=10, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
                          legend=dict(orientation="h", yanchor="bottom", y=1.02))
        st.plotly_chart(fig, use_container_width=True)
 
    # Rate vs client rating
    with col4:
        st.markdown('<div class="section-header">Target Rate per Range Min–Max (Spread Analisis)</div>', unsafe_allow_html=True)
        spread_data = dff.copy()
        spread_data["rate_spread"] = spread_data["max_hourly_usd"] - spread_data["min_hourly_usd"]
        spread_data = spread_data[
            (spread_data["target_hourly_rate_usd"] <= 250) &
            (spread_data["rate_spread"] >= 0) &
            (spread_data["rate_spread"] <= 200)
        ]
 
        fig = px.scatter(
            spread_data.sample(min(2500, len(spread_data)), random_state=1),
            x="rate_spread",
            y="target_hourly_rate_usd",
            color="experience_level",
            color_discrete_map=COLOR_MAP,
            opacity=0.5,
            trendline="ols",
            trendline_scope="overall",
            labels={"rate_spread": "Rate Spread (Max–Min) USD", "target_hourly_rate_usd": "Target Rate USD"},
            template=TEMPLATE,
        )
        fig.update_layout(height=380, margin=dict(t=20, b=40, l=40, r=20),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
                          legend=dict(orientation="h", yanchor="bottom", y=1.02, font_size=10))
        st.plotly_chart(fig, use_container_width=True)
 
    st.markdown(
        "<div class='insight-box'>"
        "📌 <b>Insight BQ2:</b> Faktor utama yang mempengaruhi pendapatan freelancer: <br>"
        "① <b>Min–Max Rate</b> berkorelasi sangat kuat dengan target rate (korelasi >0.9)"
        "konsisten artinya pricing freelancer cukup terstruktur. <br>"
        "② <b>Skill/Spesialisasi</b> memberikan perbedaan rate signifikan: skill teknikal premium "
        "(blockchain, AI, niche SaaS) dapat mencapai 2–3× rata-rata pasar. <br>"
        "③ <b>Experience Level</b> (Expert vs Entry) secara konsisten menaikkan rate ~40–60%. <br>"
        "④ <b>Client/Freelancer Rating</b> memiliki korelasi lemah dengan rate"
        "artinya rating bukan satu-satunya penentu tarif."
        "</div>",
        unsafe_allow_html=True,
    )
 
# ══════════════════════════════════════════════════════════════════════════════
# TAB 4 – Analisis Geografis
# ══════════════════════════════════════════════════════════════════════════════
with tab4:
    st.markdown("### 🌍 Distribusi Pasar Freelance Secara Geografis")
 
    col1, col2 = st.columns([3, 2])
 
    with col1:
        st.markdown('<div class="section-header">Top 20 Negara: Volume Posting & Avg Rate</div>', unsafe_allow_html=True)
        country_agg = (
            dff[dff["target_hourly_rate_usd"] <= 300]
            .groupby("country")
            .agg(
                posting_count=("target_hourly_rate_usd", "count"),
                avg_rate=("target_hourly_rate_usd", "mean"),
            )
            .reset_index()
            .sort_values("posting_count", ascending=False)
            .head(20)
        )
 
        fig = make_subplots(specs=[[{"secondary_y": True}]])
        fig.add_trace(
            go.Bar(x=country_agg["country"], y=country_agg["posting_count"],
                   name="Posting Count", marker_color="#5c6bc0", opacity=0.85),
            secondary_y=False,
        )
        fig.add_trace(
            go.Scatter(x=country_agg["country"], y=country_agg["avg_rate"],
                       name="Avg Rate (USD)", mode="lines+markers",
                       marker=dict(size=7, color="#ffa726"), line=dict(color="#ffa726", width=2)),
            secondary_y=True,
        )
        fig.update_yaxes(title_text="Jumlah Posting", secondary_y=False,
                         title_font_color="#8b95b0", tickfont_color="#8b95b0")
        fig.update_yaxes(title_text="Avg Target Rate (USD)", secondary_y=True,
                         title_font_color="#ffa726", tickfont_color="#ffa726")
        fig.update_layout(
            template=TEMPLATE, height=380,
            margin=dict(t=20, b=80, l=40, r=40),
            plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
            legend=dict(orientation="h", yanchor="bottom", y=1.02),
            xaxis=dict(tickangle=-35),
        )
        st.plotly_chart(fig, use_container_width=True)
 
    with col2:
        st.markdown('<div class="section-header">Rata-rata Rate per Negara (Top 15)</div>', unsafe_allow_html=True)
        rate_country = (
            dff[
                (dff["target_hourly_rate_usd"] <= 300) &
                (dff["country"].isin(dff["country"].value_counts().head(15).index))
            ]
            .groupby("country")["target_hourly_rate_usd"]
            .mean()
            .sort_values(ascending=True)
            .reset_index()
        )
        fig = px.bar(
            rate_country, y="country", x="target_hourly_rate_usd",
            orientation="h",
            color="target_hourly_rate_usd",
            color_continuous_scale="Blues",
            labels={"target_hourly_rate_usd": "Avg Rate (USD)", "country": ""},
            template=TEMPLATE,
            text=rate_country["target_hourly_rate_usd"].apply(lambda x: f"${x:.0f}"),
        )
        fig.update_traces(textposition="outside")
        fig.update_layout(coloraxis_showscale=False, height=380,
                          margin=dict(t=20, b=40, l=10, r=60),
                          plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)
 
    # Experience distribution by country
    st.markdown('<div class="section-header">Komposisi Experience Level: Top 10 Negara</div>', unsafe_allow_html=True)
    top10_countries = dff["country"].value_counts().head(10).index.tolist()
    ctry_exp = (
        dff[dff["country"].isin(top10_countries)]
        .groupby(["country", "experience_level"])
        .size()
        .reset_index(name="count")
    )
    ctry_total = ctry_exp.groupby("country")["count"].sum().reset_index(name="total")
    ctry_exp = ctry_exp.merge(ctry_total, on="country")
    ctry_exp["pct"] = ctry_exp["count"] / ctry_exp["total"] * 100
 
    fig = px.bar(
        ctry_exp, x="country", y="pct",
        color="experience_level",
        color_discrete_map=COLOR_MAP,
        barmode="stack",
        labels={"country": "", "pct": "% Freelancers", "experience_level": "Level"},
        template=TEMPLATE,
        category_orders={"experience_level": ["Entry level", "Intermediate", "Expert", "Unknown"]},
    )
    fig.update_layout(height=320, margin=dict(t=20, b=60, l=40, r=20),
                      plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)",
                      legend=dict(orientation="h", yanchor="bottom", y=1.02),
                      xaxis=dict(tickangle=-20))
    st.plotly_chart(fig, use_container_width=True)
 
    st.markdown(
        "<div class='insight-box'>"
        "📌 <b>Insight Geografis:</b> <b>United States</b> mendominasi volume posting (~47%) sekaligus "
        "memiliki salah satu rata-rata rate tertinggi, mencerminkan pasar yang mature dan demanding. "
        "<b>India & Pakistan</b> volume tinggi namun rate lebih rendah, kompetitif di segmen harga. "
        "<b>Israel, Australia, dan Kanada</b> menawarkan rate premium meski volume moderat."
        "</div>",
        unsafe_allow_html=True,
    )
 
# ─── FOOTER ──────────────────────────────────────────────────────────────────
st.markdown("---")
st.markdown(
    "<p style='text-align:center;color:#374151;font-size:0.78rem;'>"
    "Freelance Market Dashboard · Data: freelance_clean.csv · Built with Streamlit & Plotly"
    "</p>",
    unsafe_allow_html=True,
)