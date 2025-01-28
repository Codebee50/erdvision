import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import ColorSelectorNode from "./ColorSelectorNode";
import DatabaseTableNode from "./DatabaseTableNode";
import Relationship from "@/classes/relationship";
import CrowfootMarker from "./CrowfootMarker";
import CrowfootMarkerSource from "./CrowFootMarkerSource";

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
  relationships,
  onRelationshipCreated = () => {},
  onRelationshipDeleted = () => {},
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

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
            columns: table.columns,
            selected: selectedTable === table.flow_id,
          },
        };
      }) || []
    );
  }, [tables, selectedTable]);

  useEffect(() => {
    //execute whenever the relationships change
    setEdges(
      relationships.map((rel) => {
        return {
          id: `${rel.flow_id}`,
          source: `${rel.source_node_id}`,
          target: `${rel.target_node_id}`,
          sourceHandle: `${rel.from_column}-${rel.source_suffix}`,
          targetHandle: `${rel.to_column}-${rel.target_suffix}`,
          animated: false,
          type: "smoothstep",
          markerEnd: `${rel.to_rel === 'many'? 'crowfoot': '' }`,
          markerStart: `${rel.from_rel === 'many'? 'crowfoot-source': ''}`
        };
      })
    ) || [];
  }, []);

  const onConnect = useCallback(
    (params) => {
      const { sourceHandle, targetHandle, source, target } = params;
      const sourceSplit = sourceHandle.split("-");
      const targetSplit = targetHandle.split("-");

      const flow_id =
        Math.max(0, ...relationships.map((rel) => rel.flow_id)) + 1;

      const relationship = new Relationship({
        from_column: sourceSplit[0],
        to_column: targetSplit[0],
        flow_id: flow_id,
        id: null,
        rel_type: "one-to-one",
        synced: false,
        created: false,
        source_node_id: source,
        target_node_id: target,
        source_suffix: sourceSplit[1],
        target_suffix: targetSplit[1],
      });

      relationship.syncObject();

      onRelationshipCreated(relationship);
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: false,
            type: "smoothstep",
          },
          eds
        )
      );
    },

    [relationships]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      const deletedEdges = changes.filter((change) => change.type === "remove");
      if (deletedEdges.length > 0) {
        onRelationshipDeleted(deletedEdges);
      }
      onEdgesChange(changes);
    },
    [onEdgesChange]
  );

  const handleNodeDragStop = (event, node) => {
    console.log('Node drag stopee')
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
      <CrowfootMarker />
      <CrowfootMarkerSource/>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={handleEdgesChange}
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
