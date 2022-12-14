import { Field, Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import useTokenStore from '../store/tokenStore';

export function Auth() {
  const setToken = useTokenStore(x => x.setToken);
  const router = useNavigate();

  async function dologin(val: any) {
    let data = await login(val);

    setToken(data.data.token);

    await router('/test');
  }

  return (
    <div className="w-100 isolate flex h-[100vh] items-center justify-center overflow-hidden bg-gray-50">
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={dologin}
      >
        <Form className="mx-5 w-[300px] max-w-[100%] rounded-lg border-2 border-gray-500 bg-white p-8 text-center">
          <h3 className="text-2xl font-bold">Welcome</h3>

          <Field
            type="text"
            placeholder="username"
            name="username"
            className="border-1 mt-5 w-[100%] rounded-lg border-gray-400"
          />

          <Field
            name="password"
            type="password"
            placeholder="password"
            className="border-1 mt-2 w-[100%] rounded-lg border-gray-400"
          />

          <button
            type="submit"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-3 py-1 text-base text-white shadow-sm ring-1 ring-indigo-600"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
