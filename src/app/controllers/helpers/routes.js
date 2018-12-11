import UniversalRouter from "universal-router";

// route syntax: https://github.com/pillarjs/path-to-regexp
export const router = new UniversalRouter([
    {
      path: '',
      async action({req, context}) {
        const { load } = await import('../home');
        return load(req, context);
      }
    },

    {
      path: '(.*)',
      async action({req, context}) {
        const { load } = await import('../404');
        return load(req, context);
      }
    },
]);
