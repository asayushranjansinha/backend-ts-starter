const ResponseMessages = {
  // Success messages
  SUCCESS: 'Operation completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',

  // Error messages
  BAD_REQUEST: 'Invalid request',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred',
  TOO_MANY_REQUEST: 'Too many requests',

  // Validation messages
  INVALID_INPUT: 'Invalid input provided',
  MISSING_REQUIRED_FIELD: 'Required field is missing',

  // Custom messages
  CUSTOM_ERROR: (message: string) => `${message}`,
  CUSTOM_SUCCESS: (message: string) => `${message}`
};
export default ResponseMessages;
