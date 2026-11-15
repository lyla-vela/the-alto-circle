"""Supabase client helper for The Alto Circle backend.

Reads SUPABASE_URL and a key from the environment (backend/.env is loaded
via python-dotenv when installed). Prefers SUPABASE_SERVICE_ROLE_KEY for
server-side reads/writes; falls back to SUPABASE_ANON_KEY.

Returns None when not configured, so main.py can fall back to the
in-memory seed lists. No secrets are logged or returned.
"""
import os

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # python-dotenv is optional; env vars still work.
    pass

_client = None
_client_tried = False


def get_supabase():
    """Return a supabase client, or None if URL/key are not configured."""
    global _client, _client_tried
    if _client_tried:
        return _client
    _client_tried = True
    url = os.getenv("SUPABASE_URL", "").strip()
    key = (
        os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
        or os.getenv("SUPABASE_ANON_KEY", "").strip()
    )
    if not url or not key:
        return None
    try:
        from supabase import create_client

        _client = create_client(url, key)
    except Exception:
        _client = None
    return _client


def supabase_configured() -> bool:
    return get_supabase() is not None


def table_rows(table: str):
    """Return all rows from a Supabase table, ordered by id."""
    client = get_supabase()
    return client.table(table).select("*").order("id").execute().data or []


def insert_row(table: str, payload: dict):
    """Insert one row and return the inserted row (with id / created_at)."""
    client = get_supabase()
    data = client.table(table).insert(payload).execute().data
    return data[0] if data else payload
