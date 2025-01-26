"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import useFetchRequest from "@/hooks/useFetch";
import { baseBeUrl } from "@/urls/be";
import PageLoader from "@/components/PageLoader";
import LogoText from "@/components/LogoText";
import { FiUploadCloud } from "react-icons/fi";
import { dummyTablesList } from "@/constants/dummy";
import FlowCanvas from "@/components/diagrams/FlowCanvas";
import { useToast } from "@/hooks/use-toast";
import { IoAdd, IoAddSharp } from "react-icons/io5";
import AuthProtected from "@/components/user/AuthProtected";
import DbTable from "@/classes/table";
import DbColumn from "@/classes/column";
import { generateId } from "@/utils/functions";
import TableContent from "@/components/diagrams/TableContent";
import Relationship from "@/classes/relationship";
import Messaging from "@/components/diagrams/Messaging";
import axios from "axios";

const Page = () => {
  const { id } = useParams();
  const [diagram, setDiagram] = useState(null);
  const [tableList, setTableList] = useState([]);
  const [columnList, setColumnLIst] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [selectedTable, setSelectedTable] = useState(-1);
  const [refreshFlow, setRefreshFlow] = useState(false);
  const [typeList, setTypeList] = useState([]);

  const [error, setError] = useState(false);

  const { toast } = useToast();

  const transformRelationships = (relationships) => {
    return relationships.map((relationship) => {
      return new Relationship({
        from_column: relationship.from_column,
        to_column: relationship.to_column,
        flow_id: relationship.id,
        id: relationship.id,
        rel_type: relationship.rel_type,
        synced: relationship.synced,
        created: true,
        source_node_id: relationship.source_node,
        target_node_id: relationship.target_node,
        source_suffix: relationship.source_suffix,
        target_suffix: relationship.target_suffix,
      });
    });
  };

  const transformColumns = (columns) => {
    return columns.map((column) => {
      return new DbColumn({
        id: column.id,
        table_id: column.db_table,
        name: column.name,
        datatype: column.datatype,
        synced: column.synced,
        is_primary_key: column.is_primary_key,
        is_nullable: column.is_nullable,
        is_unique: column.is_unique,
        flow_id: column.id,
        created: true,
      });
    });
  };

  const transformTables = (tables) => {
    return tables.map((table) => {
      const columns = transformColumns(table.columns);

      return new DbTable({
        diagram: id,
        flow_id: table.id,
        name: table.name,
        id: table.id,
        columns: columns,
        x_position: table.x_position,
        y_position: table.y_position,
        synced: table.synced,
        created: true,
      });
    });
  };

  const getDataTypes = async (databaseType) => {
    try {
      const response = await axios.get(
        `${baseBeUrl}/diagram/datatypes/${databaseType}`
      );
      setTypeList(response.data.data);
    } catch (error) {}
  };

  const detailUrl = `${baseBeUrl}/diagram/detail/${id}`;
  const { mutate: fetchDiagram, isLoading: isFetchingDiagram } =
    useFetchRequest(
      detailUrl,
      (response) => {
        setDiagram(response.data);
        setTableList(transformTables(response?.data?.tables || []));
        setColumnLIst(transformColumns(response?.data?.columns || []));
        setRelationships(
          transformRelationships(response?.data?.relationships || [])
        );

        getDataTypes(response.data.database_type);
      },
      (error) => {
        setError(true);
      }
    );

  useEffect(() => {
    fetchDiagram();
  }, []);

  const handleNodeClicked = (flow_id) => {
    setSelectedTable(flow_id);
  };

  useEffect(() => {
    tableList.forEach((table) => {
      if (!table.synced) {
        table.syncObject();
      }
    });
  }, [tableList]);

  if (isFetchingDiagram) {
    return <PageLoader loaderSize={60} />;
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center">
        {/* TODO: make this finer */}
        <p className="font-medium text-xl text-red-500">
          Error fetching diagram
        </p>
      </section>
    );
  }

  const handleSyncChanges = () => {
    toast({
      title: "hello",
      swipeDirection: "left",
    });
  };

  const createDatabaseTable = () => {
    /**Creates a new database table
     *
     * Note: Until the table is fetched from the db, the flow id is used to identify it on the frontend
     * the flow id initially is the maximum backend id
     * when the table is fetched from the db, the flow id now becomes the id generated from the backend
     */
    const flow_id = Math.max(0, ...tableList.map((table) => table.flow_id)) + 1;
    // const newTable = new DbTable(id, flow_id, "New table", flow_id, [], 0, 0, false, false)
    const newTable = new DbTable({
      diagram: id,
      flow_id: flow_id,
      name: "New table",
      id: null,
      columns: [],
      x_position: 0,
      y_position: 0,
      created: false,
      synced: false,
    });

    setTableList((prev) => {
      return [...prev, newTable];
    });

    newTable.syncObject();
  };

  const handleColumnDatatypeChanged = (columnId, tableId, newDatatype) => {
    const table = tableList.find((table) => table.flow_id == tableId);

    const column = table.columns.find((column) => column.flow_id == columnId);

    if (column && newDatatype && newDatatype !== "") {
      column.datatype = newDatatype;
      table.syncObject();
      setTableList(
        tableList.map((prevTable) => {
          if (prevTable.flow_id == tableId) {
            prevTable.synced = false;
            prevTable.columns = prevTable.columns.map((prevColumn) => {
              if (prevColumn.flow_id == columnId) {
                prevColumn.datatype = newDatatype;
                prevColumn.synced = false;
              }

              return prevColumn;
            });
          }

          return prevTable;
        })
      );
    }
  };

  const handleColumnNameChange = (columnId, tableId, newName) => {
    const table = tableList.find((table) => table.flow_id == tableId);

    const column = table.columns.find((column) => column.flow_id == columnId);
    if (column && newName && newName !== "") {
      column.name = newName;
      table.syncObject();
      setTableList(
        tableList.map((prevTable) => {
          if (prevTable.flow_id == tableId) {
            prevTable.synced = false;
            prevTable.columns = prevTable.columns.map((prevColumn) => {
              if (prevColumn.flow_id == columnId) {
                prevColumn.name = newName;
                prevColumn.synced = false;
              }
              return prevColumn;
            });
          }
          return prevTable;
        })
      );
    }
  };

  const handleTableNameChanged = (tableId, newName) => {
    const table = tableList.find((table) => table.flow_id == tableId);
    if (table) {
      table.name = newName;
      table.syncObject();
      setTableList(
        tableList.map((prevNode) => {
          if (prevNode.flow_id === tableId) {
            prevNode.name = newName;
          }
          return prevNode;
        })
      );
    }
  };

  const handleColumnCreated = (flow_id) => {
    setTableList((prevlist) =>
      prevlist.map((table) => {
        if (table.flow_id == flow_id) {
          const max_id =
            Math.max(0, ...table.columns.map((column) => column.flow_id)) + 1;

          const gen_flow_id = parseInt(`${table.flow_id}${max_id}`);
          const newColumn = new DbColumn({
            id: null,
            table_id: flow_id,
            flow_id: gen_flow_id,
            name: "new_column",
            datatype: "varchar20",
          });

          return new DbTable({
            ...table,
            synced: false,
            columns: [...(table.columns || []), newColumn],
          });
        }
        return table;
      })
    );
  };

  const handleRelationshipCreated = (relationship) => {
    setRelationships((prev) => {
      return [...prev, relationship];
    });
  };

  const handleRelationshipDeleted = (deletedEdges) => {
    deletedEdges.forEach((edge) => {
      const relationship = relationships.find((rel) => rel.flow_id == edge.id);
      relationship.deleteObject(); //delete relationship from backend
    });

    setRelationships((prev) => {
      return prev.filter(
        (rel) =>
          !deletedEdges.some((deletedEdge) => deletedEdge.id === rel.flow_id)
      );
    });
  };

  return (
    <AuthProtected>
      <Messaging diagramId={id} diagramName={diagram?.name} />

      <section className="w-full min-h-screen relative flex flex-col">
        <section
          className=" w-screen h-[10vh] bg-green01 top-0 z-20 flex flex-row justify-between items-center px-6 py-2 "
          id="diagram-header"
        >
          <LogoText
            logoColor="#7ED6DF"
            textClassName="text-green02 font-medium text-green01"
          />

          <div>
            <h2 className="font-semibold text-sm text-white">
              {diagram?.name}
            </h2>
            <div className="flex flex-row items-center gap-2">
              <p className="font-extralight text-sm text-mgrey100">
                Saved 3 mins ago
              </p>
              <div className="w-[3px] h-[3px] bg-[#D9D9D9]"></div>
              <p className="font-semibold text-green02 text-sm cursor-pointer">
                Save
              </p>
            </div>
          </div>

          <button className="cursor-pointer flex flex-row items-center gap-2 bg-green01 p-3 rounded-md">
            <FiUploadCloud color="#ffffff" />
            <p className="text-[0.8rem] text-white" onClick={handleSyncChanges}>
              Sync changes
            </p>
          </button>
        </section>

        <div className="w-full flex flex-row h-[90vh]">
          <section className="z-10 w-[25%] h-full top-0 bg-white flex flex-row border-r">
            {/* <div className="w-[60px] h-screen bg-mgrey100"></div> */}

            <div className="w-full bg-white flex flex-col overflow-scroll no-scrollbar">
              <div className="w-full flex flex-row items-center justify-between p-2 text-[0.9rem] bg-[#CAF9FD]">
                <p>({diagram?.tables?.length || 0}) Tables</p>

                <button
                  className="p-1 hover:bg-green01 cursor-pointer transition-all ease-in-out rounded-sm"
                  title="New table"
                  onClick={createDatabaseTable}
                >
                  <IoAdd size={20} className="hover:text-green02" />
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
                {tableList?.map((item) => {
                  return (
                    <TableContent
                      key={item.id}
                      table={item}
                      columnList={item.columns}
                      selected={item.id == selectedTable}
                      onTableNameChanged={handleTableNameChanged}
                      onHeaderClicked={handleNodeClicked}
                      onColumnCreatedClicked={handleColumnCreated}
                      onColumnNameChanged={handleColumnNameChange}
                      typeList={typeList}
                      onColumnDatatypeChanged={handleColumnDatatypeChanged}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <div className="w-[80%] h-full">
            <FlowCanvas
              diagram={diagram}
              tables={tableList}
              columns={columnList}
              onNodeClicked={handleNodeClicked}
              selectedTable={selectedTable}
              refresh={refreshFlow}
              relationships={relationships}
              onRelationshipCreated={handleRelationshipCreated}
              onRelationshipDeleted={handleRelationshipDeleted}
            />
          </div>
        </div>
      </section>
    </AuthProtected>
  );
};

export default Page;
