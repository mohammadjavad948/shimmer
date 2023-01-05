import { useTransition, a } from '@react-spring/web';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import {
  AiOutlinePlus,
  AiFillDelete,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from 'react-icons/ai';
import useMeasure from 'react-use-measure';

export function AnswerForm(props: { name: string }) {
  return (
    <Field name={props.name}>
      {(data: FieldProps) => <Answers data={data} />}
    </Field>
  );
}

interface Data {
  h: number;
  data: string;
}

function Answers(props: { data: FieldProps }) {
  const [data, setData] = useState<Data[]>([]);

  const transition = useTransition(data, {
    from: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n, 8);

      return {
        top: allHeight - 8,
        opacity: 0,
      };
    },
    enter: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n + 8, 8);

      return {
        top: allHeight,
        opacity: 1,
      };
    },
    leave: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n, 8);

      return {
        top: allHeight - 8,
        opacity: 0,
      };
    },
    update: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n + 8, 8);

      return {
        top: allHeight,
        opacity: 1,
      };
    },
  });

  function elResize(h: number, index: number) {
    setData(el => {
      return el.map((e, i) => {
        if (i == index) {
          e.h = h;
        }

        return e;
      });
    });
  }

  function newData() {
    setData(d => {
      return [...d, { data: 'quest', h: 0 }];
    });
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Answers</span>

        <a
          onClick={newData}
          className="rounded-lg bg-slate-300 px-2 py-2 font-bold text-slate-800"
        >
          <AiOutlinePlus size={18} />
        </a>
      </div>

      <div
        className="relative flex w-full flex-col"
        style={{
          height: data.map(x => x.h).reduce((x, n) => x + n + 8, 0),
        }}
      >
        {transition((style, item, _, index) => (
          <Quest style={style} item={item} resize={elResize} index={index} />
        ))}
      </div>
    </div>
  );
}

function Quest(props: { style: any; item: Data; resize: any; index: number }) {
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    props.resize(bounds.height, props.index);
  }, [bounds.height]);

  return (
    <a.div
      ref={ref}
      style={props.style}
      className="flex absolute z-30 w-full gap-2 rounded-md bg-white p-3"
    >
      <div className="flex w-6 flex-col gap-2">
        <span className="rounded-sm bg-slate-300 p-1 text-slate-800">
          <AiOutlineCaretUp size={15} />
        </span>
        <span className="rounded-sm bg-slate-300 p-1 text-slate-800">
          <AiOutlineCaretDown size={15} />
        </span>
        <span className="rounded-sm bg-slate-300 p-1 text-slate-800">
          <AiFillDelete size={15} />
        </span>
      </div>

      <div className="flex-1 flex">
        <textarea rows={2} className="w-full h-full rounded-lg border-0 ring-0">
            {props.item.data}
        </textarea>
      </div>
    </a.div>
  );
}
