import { useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createCardGroup } from '../../api/card_group';
import { MainLayout } from '../../layout/main';

export function NewCardGroup() {

  const navigate = useNavigate();
  const query = useQueryClient();

  async function submit(val: any) {
    await createCardGroup(val);
    await query.invalidateQueries(['card-group']);
    
    navigate("/card-group");
  }

  return (
    <MainLayout>
      <div className="mb-2 flex w-full gap-2">
        <span className="text-base font-semibold text-slate-500">
          Card Groups
        </span>

        <span className="font-bold text-slate-500">&gt;</span>

        <span className="text-base font-semibold text-slate-700">New</span>
      </div>
      <Formik initialValues={{ name: '' }} onSubmit={submit}>
        <Form className="mx-auto flex w-full flex-col md:w-96">
          <span className="text-sm text-slate-500">Name</span>

          <Field
            name="name"
            type="text"
            className="mt-1 rounded-lg ring-1 ring-slate-400"
          />

          <button
            type="submit"
            className="mt-3 rounded-lg bg-slate-400 px-1 py-2 font-semibold text-slate-800"
          >
            Save
          </button>
        </Form>
      </Formik>
    </MainLayout>
  );
}
