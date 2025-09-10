# Interview coding test

## Front end

1. Prevent empty strings from being added to the list
2. Add a validation error if the user attempts to add an empty string - The error message will be 'Cannot add empty todo' in red font
3. Create a button called show filtered todos
4. The button is only visible if there are completed todos
5. When the button is clicked the list of completed todos will appear 

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

