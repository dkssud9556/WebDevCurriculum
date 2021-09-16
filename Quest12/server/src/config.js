import path from "path";

export const JWT_SECRET = "jwtsecret";

export const STORAGE_FOLDER_PATH = `${path.resolve()}/storage`;
export const JSON_FILES_PATH = `${STORAGE_FOLDER_PATH}/files.json`;

export const CERTIFICATE_PATH = `${path.resolve()}/cert/CA/localhost/localhost.crt`;
export const PRIVATE_KEY_PATH = `${path.resolve()}/cert/CA/localhost/localhost.decrypted.key`;
