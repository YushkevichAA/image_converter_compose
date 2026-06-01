/* eslint-disable react-refresh/only-export-components */
import './App.css';
import { Uploader, InputNumber, Panel, SelectPicker } from 'rsuite';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FileElementResponse, PayloadDto } from './types';
import { useState } from 'react';

enum ImageType {
  Png = 'png',
  Jpg = 'jpg',
  Webp = 'webp',
}

type TFormat = { label: string; value: ImageType };

export const format: TFormat[] = [
  { label: 'png', value: ImageType.Png },
  { label: 'jpg', value: ImageType.Jpg },
  { label: 'webp', value: ImageType.Webp },
];

export function App() {
  const [payload, setPayload] = useState<Partial<PayloadDto>>({
    width: 200,
    height: 200,
    quality: 100,
    type: ImageType.Webp,
  });
  const [result, setResult] = useState<string>();

  const uploadedFile = (response: object) => {
    console.log('переменная');
    console.log(import.meta.env.VITE_APP_API_URL);
    const file = response as FileElementResponse;
    setResult(file.url);
  };

  return (
    <div className="app">
      <div></div>
      <Panel bordered>
        <h1 className="header">Конвертер изображений</h1>
        <div className="options">
          <div>
            <label>Ширина</label>
            <InputNumber
              value={payload.width}
              min={0}
              size="md"
              onChange={(e) => setPayload((m) => ({ ...m, width: Number(e) }))}
            />
          </div>
          <div>
            <label>Высота</label>
            <InputNumber
              value={payload.height}
              min={0}
              size="md"
              onChange={(e) => setPayload((m) => ({ ...m, height: Number(e) }))}
            />
          </div>
          <div>
            <label>Качество</label>
            <InputNumber
              value={payload.quality}
              min={0}
              max={100}
              step={0.1}
              size="md"
              onChange={(e) =>
                setPayload((m) => ({ ...m, quality: Number(e) }))
              }
            />
          </div>
          <div>
            <label>Формат</label>
            <SelectPicker
              style={{ width: '100%' }}
              data={format}
              value={payload.type}
              onChange={(e) => e && setPayload((m) => ({ ...m, type: e }))}
            />
          </div>
        </div>

        <Uploader
          draggable
          fileListVisible={false}
          multiple={false}
          action={`${import.meta.env.VITE_APP_API_URL}/upload?width=${
            payload.width
          }&height=${payload.height}&quality=${payload.quality}&type=${
            payload.type
          }`}
          onSuccess={uploadedFile}
        >
          <button style={{ width: '100%', marginTop: 10, height: 200 }}>
            <ExpandOutlineIcon size="32" />
          </button>
        </Uploader>
        {result && (
          <>
            <br />
            <br />
            <h2 className="header">Результат</h2>
            <img
              className="result"
              src={import.meta.env.VITE_APP_API_URL + result}
              alt="результат"
            />
          </>
        )}
      </Panel>
    </div>
  );
}
