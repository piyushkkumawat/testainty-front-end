export const mockLoginResponse = {
    success: true,
    user: {
      id: 1,
      username: 'mockUser',
      email: 'mock@example.com'
    },
    token: 'mockAccessToken',
  };
  
  export const mockLoginCandidate = jest.fn().mockResolvedValue(mockLoginResponse);