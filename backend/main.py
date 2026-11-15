"""FastAPI backend for The Alto Circle — Palo Alto Community Space.

Data source: Supabase when SUPABASE_URL + a key are configured
(see backend/supabase_client.py and supabase/schema.sql); otherwise
falls back to the in-memory seed lists below, so it still runs locally
with no keys. GET /health reports which source is active (no secrets).

Run: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from supabase_client import insert_row, supabase_configured, table_rows

app = FastAPI(title="The Alto Circle API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Member(BaseModel):
    name: str
    company: str
    industry: str
    company_size: str  # e.g. "medium" | "large"
    role: str = "Member"


class Resource(BaseModel):
    title: str
    category: str
    summary: str


# Sample data only — no real client/business names.
# Used only when Supabase is not configured, or if a Supabase call fails.
MEMBERS = [
    {"id": 1, "name": "Sample Member — Manufacturing", "company": "Sample Manufacturing Co.", "industry": "Manufacturing", "company_size": "large", "role": "Owner"},
    {"id": 2, "name": "Sample Member — Logistics", "company": "Sample Logistics Co.", "industry": "Logistics", "company_size": "medium", "role": "Owner"},
    {"id": 3, "name": "Sample Member — Technology", "company": "Sample Technology Co.", "industry": "Technology", "company_size": "large", "role": "Founder"},
]
RESOURCES = [
    {"id": 1, "title": "Sample Resource: Member Welcome Guide", "category": "Onboarding", "summary": "How new members join, introduce themselves, and find the right people."},
    {"id": 2, "title": "Sample Resource: Community Events Playbook", "category": "Events", "summary": "How the community plans and runs member events in Palo Alto."},
]
ACTIVITY = [
    {"id": 1, "title": "Sample Activity: Monthly member meetup", "detail": "Members meet, share updates, and make introductions."},
    {"id": 2, "title": "Sample Activity: New resource published", "detail": "A new guide was added to the resources library."},
]


def _list(table: str, fallback: list):
    if supabase_configured():
        try:
            return table_rows(table)
        except Exception:
            pass  # fall through to the in-memory seed list
    return fallback


def _insert(table: str, payload: dict, fallback: list):
    if supabase_configured():
        try:
            return insert_row(table, payload)
        except Exception:
            pass  # fall through to the in-memory seed list
    item = {"id": len(fallback) + 1, **payload}
    fallback.append(item)
    return item


@app.get("/health")
def health():
    configured = supabase_configured()
    return {
        "status": "ok",
        "supabase_configured": configured,
        "data_source": "supabase" if configured else "in-memory",
    }


@app.get("/api/members")
def list_members():
    return _list("members", MEMBERS)


@app.post("/api/members", status_code=201)
def add_member(member: Member):
    return _insert("members", member.model_dump(), MEMBERS)


@app.get("/api/resources")
def list_resources():
    return _list("resources", RESOURCES)


@app.post("/api/resources", status_code=201)
def add_resource(resource: Resource):
    return _insert("resources", resource.model_dump(), RESOURCES)


@app.get("/api/activity")
def list_activity():
    return _list("activity", ACTIVITY)
