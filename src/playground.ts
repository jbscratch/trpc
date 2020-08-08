import { trpc } from '.';
import * as z from 'zod';
import axios from 'axios';

const User = z.object({
  id: z.string().uuid(),
  name: z.string(),
  points: z.number(),
});

const getUserById = trpc.endpoint(
  z
    .function()
    .args(z.string().uuid())
    .returns(z.promise(User))
    .implement(async (_id) => {
      return 'asdf' as any;
    }),
);

const userRouter = trpc.router().endpoint('getById', getUserById);
const rootRouter = trpc.router().compose('user', userRouter);
export const myApi = trpc.api(rootRouter);

export const mySDK = myApi.makeSDK({
  url: 'http://localhost',
  handler: async (url, payload) => {
    return axios.post(url, {
      data: { ...payload, context: { test: 'hello there' } },
    });
  },
});

// const qer: (arg: [string, number]) => any = ([a, b]) => {
//   console.log(a);
//   console.log(b);
// };