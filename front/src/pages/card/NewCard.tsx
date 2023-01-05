import { useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../../api/card';
import { AnswerForm } from '../../components/form/Answers';
import { MainLayout } from '../../layout/main';

export function NewCard() {
  const navigate = useNavigate();
  const query = useQueryClient();

  async function submit(val: any) {
    await createCard(val);
    await query.invalidateQueries(['card']);

    navigate('/card');
  }

  return (
    <MainLayout>
      <div className="mb-2 flex w-full gap-2">
        <span className="text-base font-semibold text-slate-500">Cards</span>

        <span className="font-bold text-slate-500">&gt;</span>

        <span className="text-base font-semibold text-slate-700">New</span>
      </div>
      <Formik
        initialValues={{
          question: '',
          answers: [],
          realAnswer: {},
          groupId: null,
        }}
        onSubmit={submit}
      >
        <Form className="grid w-full grid-cols-1 flex-col gap-3 lg:grid-cols-2">
          <div className="flex w-full flex-col">
            <span className="text-sm text-slate-500">Question</span>

            <Field
              name="question"
              as="textarea"
              rows="5"
              cols="50"
              className="mt-1 rounded-lg ring-1 ring-slate-400"
            />

            <button
              type="submit"
              className="mt-3 rounded-lg bg-slate-400 px-1 py-2 font-semibold text-slate-800"
            >
              Save
            </button>
          </div>

          <AnswerForm name="answers" />
        </Form>
      </Formik>
    </MainLayout>
  );
}
