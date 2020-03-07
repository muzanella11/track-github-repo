export default () => ({
  layoutSettings: {
    titleApps: null,
    drawer: null,
    toolbar: true,
    breadcrumbVisibility: true,
    breadcrumbs: []
  },
  isOnline: true,
  isLoading: {
    example: false
  },
  isTimeout: {
    example: false
  },
  messagesConnection: {
    offline: 'Your connection is offline',
    online: 'Your connection is online'
  },
  snackbarOptions: {
    text: 'Hello :)',
    color: 'pink',
    buttonColor: 'white',
    isShown: false
  }
})
