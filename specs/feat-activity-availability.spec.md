# Activity Availability Specification

- **Reference**: [PRD](/PRD.md) FR7.
- **Issue**: pending (`feat-activity-availability`, label `enhancement`).
- **Status**: Completed

## Problem Description

Clients need to know how many seats remain on an activity before offering a booking. The seat calculation exists in the booking service, but no endpoint exposed it, so the client could not show available seats without creating a booking.

### User Stories

- As a **customer**, I want **to see how many seats are free on an activity** so that **I know whether I can book it**.
- As a **client developer**, I want **a dedicated availability endpoint** so that **I do not have to infer seats from booking lists**.

## Solution Overview

### User/App interface

- `GET /activities/:id/availability` (public, no JWT)
- 200 response: `{ "activityId", "maxParticipants", "bookedParticipants", "availableSeats" }`
- 404 response when the activity does not exist: `{ "message": "Activity not found", "errors": [] }`
- 500 response on unexpected errors

### Model and logic

- Uses the same capacity rule as booking creation: `availableSeats = max(0, maxParticipants - bookedParticipants)`.
- `bookedParticipants` sums the participants of the activity's existing bookings.
- Read-only: no data is written.

### Acceptance Criteria

- [ ] WHEN a client requests `GET /activities/:id/availability` for an existing activity THE [System] SHALL return HTTP 200 with `activityId`, `maxParticipants`, `bookedParticipants` and `availableSeats`.
- [ ] WHEN the activity has no bookings THE [System] SHALL return `bookedParticipants` equal to 0 and `availableSeats` equal to `maxParticipants`.
- [ ] WHEN the activity is full THE [System] SHALL return `availableSeats` equal to 0.
- [ ] WHEN the activity does not exist THE [System] SHALL return HTTP 404 with message `Activity not found`.
- [ ] WHEN an unexpected error occurs THE [System] SHALL return HTTP 500.
