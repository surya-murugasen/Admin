# AI MODELS Integration Analysis

## 1. Current Architecture
The "AI MODELS - Text to Image" project is a Python-based FastAPI backend with a React (Vite) frontend. 
- **Backend Technology**: FastAPI, Python, Hugging Face Diffusers (`model.py`).
- **Frontend Technology**: React, built to `frontend/dist` and served statically by FastAPI.

## 2. FastAPI Entry Point
The entry point is `backend/main.py`. The app is instantiated as `app = FastAPI(...)`.

## 3. Existing Routes
- `POST /api/generate`: Generates an image using diffusers.
- `GET /api/health`: Provides liveness check AND returns model defaults/device info used directly by the React UI.
- `GET /api/models`: Lists available models.
- `/`: Serves static frontend files.

## 4. Existing Model/Inference Architecture
The model relies on `backend.model.generator`. It lazy-loads models on inference or initialization. It runs on CPU/GPU depending on availability.

## 5. Recommended Middleware Location
We will create a custom HMAC validation middleware or dependency injection in FastAPI. Given FastAPI's architecture, creating a reusable `Depends(verify_hmac)` dependency is cleaner and more explicit than a global middleware, allowing us to selectively protect only the Admin integration routes without breaking the React UI.

## 6. Recommended /health Implementation
**Path**: `GET /api/admin/health`
**Reasoning**: The existing `/api/health` endpoint is actively consumed by the React frontend to fetch configuration defaults (steps, dimensions, loaded model). Securing it with HMAC would break the existing UI. As instructed, we will use a separate path `/api/admin/health` for the Central Admin integration.

## 7. Recommended /stats Implementation
**Path**: `GET /api/admin/stats`
**Metrics**: 
- `current_model`: The currently loaded model ID.
- `device`: CPU/CUDA status.
- `uptime`: Process uptime.
(Note: the app currently doesn't track generation counts persistently, so we will return lightweight process-level metrics without adding database overhead).

## 8. Environment Variables
Requires `ADMIN_INTEGRATION_SECRET` added to the backend environment (e.g., `.env` file loaded via `python-dotenv` if installed, or standard `os.environ`). We will check if `python-dotenv` is available.

## 9. HMAC Integration Location
We will create `backend/admin_integration.py` containing the HMAC verification logic and the router/endpoints for `/api/admin/health` and `/api/admin/stats`. This will be included in `main.py` using `app.include_router()`.

## 10. Security Risks
- The `ADMIN_INTEGRATION_SECRET` must not be exposed in the FastAPI `/api/health` response or any frontend static files.
- Python `time.time()` and `hmac.compare_digest` (constant time comparison) will be used to prevent replay and timing attacks safely.

## 11. Files Expected to Change
- `backend/main.py` (Include router)
- `backend/admin_integration.py` (New file for HMAC and Admin routes)
- `.env` (New file for backend secret)
