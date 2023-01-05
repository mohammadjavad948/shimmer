import { useTransition, a } from '@react-spring/web';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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

  const transition = useTransition(
    data,
    {
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
    },
  );

  function elResize(h: number, index: number){
    setData((el) => {
        return el.map((e, i) => {
            if (i == index) {
                e.h = h;
            }

            return e;
        });
    })
}

  function newData(){

    setData(d => {
        return [...d, {data: "quest", h: 0}];
    })
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Answers</span>

        <a onClick={newData} className="rounded-lg bg-slate-300 px-2 py-2 font-bold">
          <AiOutlinePlus size={18} />
        </a>
      </div>

      <div className="flex flex-col w-full relative" style={{
        height: data
        .map(x => x.h)
        .reduce((x, n) => x + n + 8, 0)
      }}>
        {transition((style, item, _, index) =>  (
            <Quest style={style} item={item} resize={elResize} index={index} />
        ))}
      </div>
    </div>
  );
}

function Quest(props: {style: any, item: Data, resize: any, index: number}) {

    const [ref, bounds] = useMeasure();

    useEffect(() => {
        props.resize(bounds.height, props.index);
    }, [bounds.height]);

    return (
        <a.div ref={ref} style={props.style} className="z-30 w-full rounded-md p-3 bg-white absolute">
            {props.item.data}
        </a.div>
    )
}