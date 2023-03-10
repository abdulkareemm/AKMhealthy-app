import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import moment from "moment"

const FormDoctor = ({ onFinish, initivalValues }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={initivalValues?{
        ...initivalValues,
        timings: [
          moment(initivalValues?.timings[0],"HH:mm"),
          moment(initivalValues?.timings[1],"HH:mm"),
        ],
      }:null}
    >
      <h1 className="mt-3 mb-2 text-xl text-black/40 font-semibold ">
        Personal Information
      </h1>

      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex items-center justify-center mt-2">
        <hr className="text-black  border-2 w-[93%]" />
      </div>
      <h1 className="mt-3 mb-2 text-xl text-black/40 font-semibold ">
        Professional Information
      </h1>

      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Cunsultation"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Cunsultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <div className=" flex justify-end -mt-10">
        <Button
          className="bg-backgroundC px-4 text-white hover:!text-black hover:scale-125"
          htmlType="submit"
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default FormDoctor;
