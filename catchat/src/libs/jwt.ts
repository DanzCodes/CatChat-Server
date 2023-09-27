import jwt from "jsonwebtoken";

const randomSalt = "qw/er3%12y·uiop43&nbvc867z";

export const createToken = async (payload: Object, rememberme: boolean) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.PRIVATE_RANDOM_SALT || randomSalt,
      {
        expiresIn: rememberme ? "365d" : "1d",
      },
      (err: Error | null, token: string | undefined) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};

export const verifyToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.PRIVATE_RANDOM_SALT || randomSalt,
      (err: Error | null, decoded: any) => {
        if(err) return reject(err);

        return resolve(decoded);
      }
    )
  })
}