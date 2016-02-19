config.port = process.env.PORT || 5000;

config.admin = {
  username: process.env.QUIZMAKER_USER,
  password: process.env.QUIZMAKER_PASS,
};

config.title = 'Quiz Maker';

config.S3 = {
  policy: process.env.QUIZMAKER_AWS_S3_BUCKET_POLICY,
  signature: process.env.QUIZMAKER_AWS_S3_BUCKET_SIG,
  url: process.env.QUIZMAKER_AWS_S3_BUCKET_UPLOAD_URI,
  key: process.env.QUIZMAKER_AWS_ACCESS_KEY_ID,
  acl: 'public-read',
  staticUrl: process.env.QUIZMAKER_AWS_S3_BUCKET_SERVE_URI,
};
