# Security Specification - EstatePro

## Data Invariants
1. A **Property** must belong to a valid `userId` (the publisher).
2. A **Lead** must be associated with an existing `propertyId` and the correct `publisherId`.
3. Only **Admin** users can create/modify **Plans**.
4. Only **Admin** users can modify a user's `role` or `status`.
5. A **Publicador** can only create properties if they have an active plan and haven't exceeded their limit (limit check is done via server-side or if necessary with `get()` in rules, though here it's simple monetization).
6. **Property** updates are restricted: only the owner or an admin can update.

## The "Dirty Dozen" Payloads

1. **Payload 1: Identity Spoofing (Property)**
   ```json
   {
     "userId": "other_user_id",
     "title": "Malicious Property",
     "price": 100
   }
   ```
   *Target*: Create a property for someone else.
   *Expected*: `PERMISSION_DENIED`.

2. **Payload 2: Role Escalation (User Profile)**
   ```json
   {
     "role": "admin"
   }
   ```
   *Target*: Change own role to admin during registration or update.
   *Expected*: `PERMISSION_DENIED`.

3. **Payload 3: Ghost Field Injection (Property)**
   ```json
   {
     "title": "Beach Villa",
     "isVerifiedByAdmin": true
   }
   ```
   *Target*: Inject a field that should only be set by the system/admin.
   *Expected*: `PERMISSION_DENIED`.

4. **Payload 4: Invalid ID Poisoning**
   *Target*: Access/Create document with a 2KB ID string.
   *Expected*: `PERMISSION_DENIED`.

5. **Payload 5: Price Manipulation (Update)**
   *Target*: Publisher changes price to negative.
   *Expected*: `PERMISSION_DENIED` (via `isValidProperty`).

6. **Payload 6: Lead Injection**
   *Target*: Create a lead for a non-existent property.
   *Expected*: `PERMISSION_DENIED`.

7. **Payload 7: Unauthorized Lead Access**
   *Target*: Random user tries to list/get leads of another publisher.
   *Expected*: `PERMISSION_DENIED`.

8. **Payload 8: Plan bypassing**
   *Target*: User attempts to create property after their plan expired.
   *Expected*: `PERMISSION_DENIED`.

9. **Payload 9: PII Leak (User List)**
   *Target*: List all users to scrape emails.
   *Expected*: `PERMISSION_DENIED`.

10. **Payload 10: Immutable Field Overwrite (createdAt)**
    *Target*: Update the `createdAt` timestamp of a property.
    *Expected*: `PERMISSION_DENIED`.

11. **Payload 11: Large String Injection (Denial of Wallet)**
    *Target*: Property `description` with 1MB of junk text.
    *Expected*: `PERMISSION_DENIED` (via `.size()`).

12. **Payload 12: Anonymous Write**
    *Target*: Write any document without being signed in.
    *Expected*: `PERMISSION_DENIED`.

## Test Plan
I will use the `firestore.rules` to enforce:
- `isSignedIn()`
- `isValidProperty(data)`
- `isOwner(userId)`
- `isAdmin()`
- `affectedKeys().hasOnly(...)`
