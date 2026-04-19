const getSkills = (req, res) => {
    const skills = [
        'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js',
    'Express.js', 'FastAPI', 'TensorFlow', 'Scikit-learn',
    'SQL', 'MongoDB', 'Docker', 'Git', 'REST API', 'GraphQL',
    ];

    res.json({
        success: true,
        data: { skills },
    });
};

module.exports = { getSkills };