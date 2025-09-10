# Interview coding test

## Front end

1. Prevent empty strings from being added to the list
2. Add a validation error if the user attempts to add an empty string - The error message will be 'Cannot add empty todo' in red font

## Backend

1. Try to delete a todo - there is an error that needs to be resolved
2. Navigate to the `/login` page - enter the following credentials:
    * Username: testuser
    * Password: password
* You are required to debug the error.

3. **Input Validation**: Create validation middleware in `src/app/api/middleware/validation.ts` that:
   - Validates todo title (required, string, 1-255 chars)
   - Returns proper error responses with field-specific error messages
   - Apply this validation to the POST /api/todos endpoint

**Testing Instructions for Task 3:**
To verify your validation works, test these scenarios using browser dev tools or curl:

1. **Valid title test:**
   ```bash
   curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title": "Valid todo item"}'
   ```
   Expected: 201 status with created todo object

2. **Empty title test:**
   ```bash
   curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title": ""}'
   ```
   Expected: 400 status with error message about empty title

3. **Missing title test:**
   ```bash
   curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{}'
   ```
   Expected: 400 status with error message that title is required

4. **Long title test:**
   ```bash
   curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis."}'
   ```
   Expected: 400 status with error message that title exceeds character limit


**Success Criteria:** All 4 tests return the expected responses.

