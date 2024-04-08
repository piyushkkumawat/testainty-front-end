jest.mock('@react-pdf/renderer', () => ({
    ...jest.requireActual('@react-pdf/renderer'),
    Page: ({ children }) => <div>{children}</div>,
    Text: ({ children }) => <span>{children}</span>,
    View: ({ children }) => <div>{children}</div>,
    Document: ({ children }) => <div>{children}</div>,
    StyleSheet: { create: styles => styles },
    Image: () => <img alt='' />,
  }));
  