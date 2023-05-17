import React from "react";
import { Button, Dropdown as DropdownAntd } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

const columns = (handleEdit, handleDelete) => [
  {
    title: "#",
    dataIndex: "sur",
    key: "sur",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "PercentPrice %",
    dataIndex: "percentPrice",
    key: "percentPrice",
  },
  {
    title: "Price (VNĐ)",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <DropdownAntd
        menu={{
          items: [
            {
              key: "1",
              label: (
                <div
                  style={{ display: "flex" }}
                  onClick={() => handleEdit(record)}
                >
                  <FiEdit className="mx-2" /> Edit
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <div
                  style={{ display: "flex" }}
                  onClick={() => handleDelete(record)}
                >
                  <MdOutlineDelete className="mx-2" />
                  Delete
                </div>
              ),
            },
          ],
        }}
        placement="bottomLeft"
        arrow
      >
        <Button>
          <div style={{ display: "flex" }}>
            <AiFillSetting className="mx-2" />
            Action
          </div>
        </Button>
      </DropdownAntd>
    ),
  },
];

export default columns;
