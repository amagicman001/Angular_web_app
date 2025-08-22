const db = require('../models');
(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Database initialized.');
    process.exit(0);
  } catch (err) {
    console.error('DB init error:', err);
    process.exit(1);
  }
})();
