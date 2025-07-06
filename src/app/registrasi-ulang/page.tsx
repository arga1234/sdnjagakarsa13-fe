// /* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Typography,
  Checkbox,
  DatePicker,
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  ManOutlined,
  HomeOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { useRegistrasiUlangHook } from './hook';

const { Option } = Select;
const { Title, Text } = Typography;

export default function RegistrasiUlangPage() {
  const {
    form,
    agreed,
    normFile,
    handleFinish,
    handleCheckboxChange,
    beforeUpload,
  } = useRegistrasiUlangHook();
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0px 24px',
        height: '100dvh',
        overflowY: 'auto',
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'var(--background)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <Title style={{ textAlign: 'center' }} level={4}>
            <b>BIODATA MURID</b>
          </Title>
          <Text>SD Negeri Jagakarsa 13 Pagi</Text>
        </Form.Item>
        <Form.Item
          label="Nama Lengkap"
          name="nama"
          rules={[{ required: true, message: 'Nama harus diisi' }]}
        >
          <Input
            size="large"
            prefix={
              <UserOutlined style={{ marginRight: '5px' }}></UserOutlined>
            }
            placeholder="Masukan Nama Lengkap"
            variant="filled"
          />
        </Form.Item>

        <Form.Item
          label="Tempat Lahir"
          name="tempatLahir"
          rules={[{ required: true, message: 'Tempat lahir harus diisi' }]}
        >
          <Input
            size="large"
            prefix={
              <HomeOutlined style={{ marginRight: '5px' }}></HomeOutlined>
            }
            placeholder="Masukan Tempat Lahir"
            variant="filled"
          />
        </Form.Item>

        <Form.Item
          label="Tanggal Lahir"
          name="tanggalLahir"
          rules={[{ required: true, message: 'Tanggal lahir harus diisi' }]}
        >
          <DatePicker
            size="large"
            variant="filled"
            style={{ width: '100%' }}
            format="DD-MM-YYYY"
            placeholder="Pilih Tanggal Lahir"
          />
        </Form.Item>

        <Form.Item
          label="Jenis Kelamin"
          name="jenisKelamin"
          rules={[{ required: true, message: 'Pilih jenis kelamin' }]}
        >
          <Select
            prefix={<ManOutlined style={{ marginRight: '5px' }}></ManOutlined>}
            size="large"
            variant="filled"
            placeholder="Pilih Jenis kelamin"
          >
            <Option value="Laki-laki">Laki-laki</Option>
            <Option value="Perempuan">Perempuan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Nomor Induk Kependudukan"
          name="nik"
          rules={[
            { required: true, message: 'NIK harus diisi' },
            { len: 16, message: 'NIK harus 16 digit' },
          ]}
        >
          <Input
            prefix={
              <IdcardOutlined style={{ marginRight: '5px' }}></IdcardOutlined>
            }
            variant="filled"
            size="large"
            placeholder="Masukkan NIK"
            maxLength={16}
          />
        </Form.Item>

        <Form.Item
          label="Nomor Kartu Keluarga"
          name="kk"
          rules={[
            { required: true, message: 'No KK harus diisi' },
            { len: 16, message: 'No KK harus 16 digit' },
          ]}
        >
          <Input
            prefix={
              <IdcardOutlined style={{ marginRight: '5px' }}></IdcardOutlined>
            }
            size="large"
            variant="filled"
            placeholder="Masukkan Nomor KK"
            maxLength={16}
          />
        </Form.Item>

        {[
          { label: 'Scan Ijazah', name: 'ijazahTk' },
          { label: 'Scan Akte Kelahiran', name: 'akte' },
          { label: 'Scan Kartu Keluarga', name: 'kartuKeluarga' },
          { label: 'Pas Foto Terbaru', name: 'pasFoto' },
        ].map((item) => (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: `Upload ${item.label}` }]}
          >
            <Upload
              style={{ width: '100%' }}
              beforeUpload={beforeUpload}
              multiple={false}
            >
              <Button
                style={{ width: '100%' }}
                variant="filled"
                size="large"
                icon={<UploadOutlined />}
              >
                Upload {item.label} Max 1MB
              </Button>
            </Upload>
          </Form.Item>
        ))}
        <Form.Item name="agreement" valuePropName="checked">
          <Checkbox onChange={handleCheckboxChange}>
            Saya menyetujui bahwa data yang saya berikan adalah benar.
          </Checkbox>
        </Form.Item>
        <Form.Item
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'var(--background)',
            margin: 0,
            padding: '24px 0px',
          }}
        >
          <Button
            size="large"
            disabled={!agreed}
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Kirim Formulir
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}