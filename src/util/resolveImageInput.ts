import request from "request-promise-native";

export function resolveImageInput(input: string | Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    if (typeof input === "string") {
      // must be an url, right?
      // Try to fetch image
      request({ url: input, encoding: null })
        .then((bodyBuffer: Buffer) => resolve(bodyBuffer))
        .catch((err: Error) => reject("Failed to fetch image."));
    } else if (Buffer.isBuffer(input)) {
      // must be a image buffer, right?
      resolve(input);
    } else {
      // invalid input
      reject("Invalid input");
      return;
    }
  });
}
