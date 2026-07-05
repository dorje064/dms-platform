import { join } from 'path';

/**
 * Absolute path to the directory where uploaded images are stored.
 * Resolved from the process working directory (workspace root when run
 * via `nx serve api` or `node dist/apps/api/main.js` from the repo root).
 * Shared by the static-asset handler (main.ts) and the multer storage config.
 */
export const UPLOAD_DIR = join(process.cwd(), 'apps/api/uploads');

/** Public URL path prefix under which uploads are served statically. */
export const UPLOAD_URL_PREFIX = '/uploads';

/** Max upload size in bytes (5 MB). */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Allowed image mime types. */
export const ALLOWED_IMAGE_MIME = /^image\/(jpe?g|png|gif|webp)$/;
