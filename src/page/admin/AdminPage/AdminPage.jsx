/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Form, Select, Table } from "antd";
import {
  WrapperExportExcelButton,
  WrapperItemContent,
  WrapperSelect,
} from "./style";
import { MdEdit, MdDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { compareDate, compareString, convertDateFormat } from "../../../ultils";
import { IoIosSearch } from "react-icons/io";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import Search from "antd/es/input/Search";
import * as UserService from "../../../services/UserService";
import AdminDrawerUserComponent from "../../../components/AdminComponent/AdminDrawerProductComponent/AdminDrawerUserComponent";
import AdminUserUpdateModalComponent from "../../../components/AdminComponent/AdminUserModalComponent/AdminUserUpdateModalComponent";
import dayjs from "dayjs";
import AdminUserDeleteModalComponent from "../../../components/AdminComponent/AdminUserModalComponent/AdminUserDeleteModalComponent";

const ProductPage = () => {
  const [rowSelected, setRowSelected] = useState({});
  const [isDate, setIsDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdateProduct = () => {
    showUpdateModal();
  };

  const handleDetailProduct = () => {
    showDrawer(true);
  };

  const renderAction = () => {
    return (
      <Flex gap={5}>
        <AiOutlineEye
          size={24}
          style={{ cursor: "pointer", color: "#22c35e" }}
          onClick={handleDetailProduct}
        />
        <MdEdit
          size={24}
          color="#ECC94B"
          style={{ cursor: "pointer" }}
          onClick={handleUpdateProduct}
        />
        <MdDelete
          size={24}
          color="#DD6B20"
          style={{ cursor: "pointer" }}
          onClick={showDeleteModal}
        />
      </Flex>
    );
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => compareString(a.name, b.name),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      sorter: (a, b) => compareString(a.gender, b.gender),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      sorter: (a, b) => compareDate(a.birthday, b.birthday),
      render: (birthday) => {
        return birthday ? convertDateFormat(birthday) : "";
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => compareString(a.phone, b.phone),
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => compareString(a.address, b.address),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => compareString(a.email, b.email),
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "5%",
      render: renderAction,
    },
  ];


  const tableRef = useRef(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const initTable = {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {},
  });

  const getAllUser = async (page, pageSize, type, search) => {
    const res = await UserService.getAllUser(page, pageSize, type, search);
    return res;
  };

  const {
    data: listUser,
    refetch,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      getAllUser(
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
        tableParams.filters.type,
        tableParams.filters.value
      ),
  });

  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination,
      filters: tableParams.filters,
      ...sorter,
    });
  };

  const onFinish = async (values) => {
    const { name, valueSearch } = values;
    setTableParams((prev) => ({
      ...prev,
      filters: {
        type: name,
        value: valueSearch,
      },
    }));
  };

  useEffect(() => {
    const total = listUser?.total;
    setTableParams((prev) => ({
      ...initTable,
      pagination: {
        ...prev.pagination,
        total,
      },
    }));
  }, [listUser?.total]);

  useEffect(() => {
    refetch();
  }, [tableParams]);

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "Action");
    return arr;
  }, [columns]);

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("User")
      .addColumns(newColumnExport)
      .addDataSource(listUser && listUser.data, {
        str2Percent: true,
      })
      .saveAs("User.xlsx");
  };

  return (
    <WrapperItemContent>
      <Flex vertical gap={16}>
        <Flex justify="center" align="center">
          <h1>Quản lý người dùng</h1>
        </Flex>
        <Flex
          style={{ margin: "16px 0" }}
          justify="space-between"
          align="center"
        >
          <Form
            name="formSearch"
            style={{
              maxWidth: 600,
              padding: "10px",
            }}
            colon={false}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            layout="vertical"
          >
            <Flex>
              <Form.Item name="name" style={{ margin: "0 10px 0 0" }}>
                <WrapperSelect
                  placeholder="Chọn giá trị"
                  name="name"
                  allowClear
                  onChange={(values) => {
                    if (values === "birthday") {
                      setIsDate(true);
                    } else {
                      setIsDate(false);
                    }
                  }}
                >
                  <Select.Option value="name">Tên</Select.Option>
                  <Select.Option value="gender">Giới tính</Select.Option>
                  <Select.Option value="birthday">Ngày sinh</Select.Option>
                  <Select.Option value="phone">Số điện thoại</Select.Option>
                  <Select.Option value="address">Địa chỉ</Select.Option>
                  <Select.Option value="email">Email</Select.Option>
                </WrapperSelect>
              </Form.Item>

              <Form.Item name="valueSearch" style={{ margin: "0" }}>
                <Search
                  placeholder="Nhập thông tin..."
                  enterButton={
                    <Button type="primary" htmlType="submit" >
                      <IoIosSearch />
                    </Button>
                  }
                  className="btn-search"
                  style={{ width: 280 }}
                  type={isDate ? "date" : "text"}
                ></Search>
              </Form.Item>
            </Flex>
          </Form>
          <WrapperExportExcelButton onClick={exportExcel}>
            <Flex gap={5}>
              <SiMicrosoftexcel style={{ fontSize: "18px" }} />
              <span>Xuất excel</span>
            </Flex>
          </WrapperExportExcelButton>
        </Flex>
        <LoadingComponent isPending={isLoading || isFetching }>
          <Table
            ref={tableRef}
            columns={columns}
            rowKey={(record) => record._id}
            dataSource={listUser && listUser.data}
            pagination={{
              ...tableParams.pagination,
              size: "default",
            }}
            bordered
            onChange={handleTableChange}
            size="small"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  const birthday = record.birthday
                    ? dayjs(record.birthday, "YYYY-MM-DD")
                    : null;
                  setRowSelected({ ...record, birthday });
                },
              };
            }}
          />
        </LoadingComponent>
      </Flex>
      <AdminUserDeleteModalComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        user={rowSelected}
        refetch={refetch}
      />

      <AdminUserUpdateModalComponent
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        user={rowSelected}
        refetch={refetch}
      />

      <AdminDrawerUserComponent
        onClose={onClose}
        open={open}
        user={rowSelected}
      />
    </WrapperItemContent>
  );
};
export default ProductPage;
