import React, { useEffect, useMemo, useState } from "react";
import { Button, Flex, Form, Select, Table } from "antd";
import {
    WrapperButtonHeader,
    WrapperItemContent,
    WrapperSelect,
} from "./style";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { comparePrice, compareString } from "../../../ultils";
import { IoIosSearch } from "react-icons/io";
import { WrapperExportExcelButton } from "../AdminPage/style";
import { Excel } from "antd-table-saveas-excel";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminProductCreateModalComponent from "../../../components/AdminComponent/AdminProductModalComponent/AdminProductCreateModalComponent";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import AdminDrawerProductComponent from "../../../components/AdminComponent/AdminDrawerProductComponent/AdminDrawerProductComponent";
import AdminProductUpdateModalComponent from "../../../components/AdminComponent/AdminProductModalComponent/AdminProductUpdateModalComponent";
import AdminProductDeleteModalComponent from "../../../components/AdminComponent/AdminProductModalComponent/AdminProductDeleteModalComponent";
import Search from "antd/es/input/Search";
import * as ProductService from "../../../services/ProductService";
import dayjs from "dayjs";

const ProductPage = () => {
    const [rowSelected, setRowSelected] = useState({});
    const [isDate, setIsDate] = useState(false);
    const [open, setOpen] = useState(false);

    //   const [isLoading, setIsLoading] = useState(false);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            sorter: (a, b) => compareString(a.name, b.name),
        },
        {
            title: "Giá",
            dataIndex: "price",
            sorter: (a, b) => comparePrice(a.price, b.price),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            sorter: (a, b) => compareString(a.description, b.description),
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            sorter: (a, b) => comparePrice(a.rating, b.rating),
        },
        {
            title: "Số hàng tồn",
            dataIndex: "countInStock",
            sorter: (a, b) => comparePrice(a.countInStock, b.countInStock),
        },
        {
            title: "Số đã bán",
            dataIndex: "selled",
            sorter: (a, b) => comparePrice(a.selled, b.selled),
        },
        {
            title: "Action",
            dataIndex: "Action",
            width: "5%",
            render: renderAction,
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const showUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        filters: {},
    });

    const getAllProducts = async (page, pageSize, type, search) => {
        const res = await ProductService.getAllProduct(
            page,
            pageSize,
            type,
            search
        );
        return res;
    };

    const {
        data: listProduct,
        refetch,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () =>
            getAllProducts(
                tableParams.pagination.current,
                tableParams.pagination.pageSize,
                tableParams.filters.type,
                tableParams.filters.value
            ),
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    const onFinish = async (values) => {
        const { name, valueSearch } = values;
        if (name === "price" && isNaN(Number(valueSearch))) {
            form.setFields([
                {
                    name: "valueSearch",
                    errors: ["Giá phải là số"],
                },
            ]);
            return;
        } else if (name === "rating" && isNaN(Number(valueSearch))) {
            form.setFields([
                {
                    name: "valueSearch",
                    errors: ["Đánh giá phải là số"],
                },
            ]);
            return;
        } else {
            form.setFields([
                {
                    name: "valueSearch",
                    errors: [""],
                },
            ]);
        }
        setTableParams((prev) => ({
            ...prev,
            filters: {
                type: name,
                value: valueSearch,
            },
        }));
    };

    useEffect(() => {
        const total = listProduct?.total;
        setTableParams((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                total,
            },
        }));
    }, [listProduct]);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableParams]);
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== "Action");

        return arr;
    }, [columns]);

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("Product")
            .addColumns(newColumnExport)
            .addDataSource(listProduct.data, {
                str2Percent: true,
            })
            .saveAs("Product.xlsx");
    };

    return (
        <WrapperItemContent>
            <Flex vertical gap={16}>
                <Flex
                    justify="center"
                    align="center"
                    style={{ marginBottom: "60px" }}
                >
                    <h1>Quản lý Sản Phẩm</h1>
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
                            <Form.Item
                                name="name"
                                style={{ margin: "0 10px 0 0" }}
                            >
                                <WrapperSelect
                                    placeholder="Chọn giá trị"
                                    name="name"
                                    allowClear
                                    onChange={(values) => {
                                        if (values === "createdAt") {
                                            setIsDate(true);
                                        } else {
                                            setIsDate(false);
                                        }
                                    }}
                                >
                                    <Select.Option value="name">
                                        Tên
                                    </Select.Option>
                                    <Select.Option value="price">
                                        Giá
                                    </Select.Option>
                                    <Select.Option value="description">
                                        Mô tả
                                    </Select.Option>
                                    <Select.Option value="rating">
                                        Đánh giá
                                    </Select.Option>
                                    <Select.Option value="createdAt">
                                        Ngày tạo
                                    </Select.Option>
                                </WrapperSelect>
                            </Form.Item>

                            <Form.Item
                                name="valueSearch"
                                style={{ margin: "0" }}
                            >
                                <Search
                                    placeholder="Nhập thông tin..."
                                    enterButton={
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
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
                    <Flex>
                        <WrapperExportExcelButton onClick={exportExcel}>
                            <Flex gap={5}>
                                <SiMicrosoftexcel
                                    style={{ fontSize: "18px" }}
                                />
                                <span>Xuất excel</span>
                            </Flex>
                        </WrapperExportExcelButton>
                        <WrapperButtonHeader onClick={showModal}>
                            <Flex gap={5}>
                                <FaPlus style={{ fontSize: "18px" }} />
                                <span>Thêm sản phẩm</span>
                            </Flex>
                        </WrapperButtonHeader>
                    </Flex>
                </Flex>
                <LoadingComponent isPending={isLoading || isRefetching}>
                    <Table
                        columns={columns}
                        rowKey={(record) => record._id}
                        dataSource={listProduct && listProduct.data}
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
                                    const birthday = record.createdAt
                                        ? dayjs(record.birthday, "YYYY-MM-DD")
                                        : null;
                                    setRowSelected({ ...record, birthday });
                                },
                            };
                        }}
                    />
                </LoadingComponent>
            </Flex>
            <AdminProductCreateModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                refetch={refetch}
            />
            <AdminProductUpdateModalComponent
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                product={rowSelected}
                refetch={refetch}
            />
            <AdminProductDeleteModalComponent
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                product={rowSelected}
                refetch={refetch}
            />
            <AdminDrawerProductComponent
                onClose={onClose}
                open={open}
                product={rowSelected}
            />
        </WrapperItemContent>
    );
};
export default ProductPage;
