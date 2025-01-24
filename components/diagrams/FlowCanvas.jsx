import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import ColorSelectorNode from "./ColorSelectorNode";
import DatabaseTableNode from "./DatabaseTableNode";

const initBgColor = "#F2F4F5";

const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  tableNode: DatabaseTableNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const FlowCanvas = ({
  diagram,
  tables,
  columns,
  onNodeClicked = () => {},
  selectedTable,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  console.log("selected table ", selectedTable);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    //setting the initial database tables
    setNodes(
      tables?.map((table, index) => {
        return {
          id: `${table.flow_id}`,
          type: "tableNode",
          position: { x: table.x_position, y: table.y_position },
          data: {
            onChange: onChange,
            color: initBgColor,
            label: table.name,
            // columns: columns.filter((column) => column.table_id === table.id),
            columns: table.columns,
            selected: selectedTable === table.flow_id,
          },
        };
      }) || []
    );

    // setNodes([
    //   {
    //     id: "1",
    //     type: "input",
    //     data: { label: "An input node" },
    //     position: { x: 0, y: 50 },
    //     sourcePosition: "right",
    //   },
    //   {
    //     id: "2",
    //     type: "selectorNode",
    //     data: { onChange: onChange, color: initBgColor },
    //     position: { x: 300, y: 50 },
    //   },
    //   {
    //     id: "5",
    //     type: "tableNode",
    //     data: { onChange: onChange, color: initBgColor, label:"Accounts" },
    //     position: { x: 500, y: 50 },
    //   },
    //   {
    //     id: "3",
    //     type: "output",
    //     data: { label: "Output A" },
    //     position: { x: 650, y: 25 },
    //     targetPosition: "left",
    //   },
    //   {
    //     id: "4",
    //     type: "output",
    //     data: { label: "Output B" },
    //     position: { x: 650, y: 100 },
    //     targetPosition: "left",
    //   },
    // ]);

    // setEdges([
    //   {
    //     id: "e1-2",
    //     source: "1",
    //     target: "2",
    //     type: "smoothstep",
    //     // animated: true,
    //   },
    //   {
    //     id: "e2a-3",
    //     source: "2",
    //     target: "3",
    //     sourceHandle: "a",
    //     type: "smoothstep",

    //     // animated: true,
    //   },
    //   {
    //     id: "e2b-4",
    //     source: "2",
    //     target: "4",
    //     sourceHandle: "b",
    //     type: "smoothstep",

    //     // animated: true,
    //   },
    // ]);
  }, [tables, selectedTable]);

  const onConnect = useCallback(
    (params) => {
      console.log('connected', params)
      setEdges((eds) =>
        addEdge({ ...params, animated: false, type: "smoothstep" }, eds)
      );
    },

    []
  );

  const handleNodeDragStop = (event, node) => {
    const dbTable = tables.find((table) => table.flow_id == node.id);
    if (dbTable) {
      dbTable.x_position = node.position.x;
      dbTable.y_position = node.position.y;
      dbTable.syncObject();
    }
  };

  const handleNodeClicked = (event, node) => {
    onNodeClicked(node.id);
  };

  return (
    <section className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        onNodeDragStop={handleNodeDragStop}
        onNodeClick={handleNodeClicked}
        zoomOnScroll={false}
        panOnScroll={true}

        // attributionPosition="bottom-left"
      >
        {/* <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === "input") return "#0041d0";
            if (n.type === "selectorNode") return bgColor;
            if (n.type === "output") return "#ff0072";
          }}
          nodeColor={(n) => {
            if (n.type === "selectorNode") return bgColor;
            return "#fff";
          }}
        /> */}
        <Controls />
        <Background />
      </ReactFlow>
    </section>
  );
};

export default FlowCanvas;
