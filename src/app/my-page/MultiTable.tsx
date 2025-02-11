"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteAxiosData, getAxiosData } from "@/lib/axiosData";
import { useParams } from "next/navigation";
import {
  faCopy,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { msgType } from "@/lib/utils";
import CustomTooltip from "@/components/providers/CustomTooltip";
import { useRouter } from "next/navigation";

export type tableType = {
  revId: string;
  revName: string;
  revCom: string;
  revDate: string;
  hotelId: string;
  revPeriod: string;
  visitMethod: "car" | "walking";
};

export type dataType = {
  reserveId: string;
  revName: string;
  visitMethod: string;
  revDate: string;
  startDate: string;
  endDate: string;
  revPeriod: string;
  hotelId: string;
  hotelInfo: { ldgs_nm: string };
};

const MultiTable = () => {
  const router = useRouter();

  const { id } = useParams() as { id: string };
  const [sorting, setSorting] = useState<SortingState>([]);
  useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dataState, setData] = useState<tableType[]>([]);

  const columns: ColumnDef<tableType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "revId",
      header: () => <div>예약번호</div>,
      size: 100,

      cell: ({ row }) => {
        return (
          <CustomTooltip
            icon={faCopy}
            btnClass=""
            type="clipboard"
            value={row.getValue("revId")}
            onClick={() => {
              navigator.clipboard.writeText(row.original.revId);
              toast("복사 완료");
            }}
          />
        );
      },
    },
    {
      accessorKey: "revName",
      header: "예약자명",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("revName")}</div>
      ),
    },
    {
      accessorKey: "revCom",
      header: () => <div>예약 업체</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("revCom")}</div>;
      },
    },
    {
      accessorKey: "revDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약 날짜
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("revDate")}</div>
      ),
    },
    {
      accessorKey: "revPeriod",
      header: () => <div>참여/숙박 기간</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("revPeriod")}</div>;
      },
    },
    {
      accessorKey: "visitMethod",
      header: () => <div>방문 수단</div>,
      cell: ({ row }) => {
        const type: string = row.getValue("visitMethod");
        const val = type === "NCAR" ? "도보" : "차량";
        return (
          <Badge variant={val === "도보" ? "outline" : "default"}>
            <div className="font-medium">{val}</div>
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const reserveId = row.original.revId;
        return (
          <div className="">
            <CustomTooltip
              btnClass="mr-1 h-8 px-2 pb-1"
              icon={faPenToSquare}
              text="수정"
              type="icnBtn"
              onClick={() =>
                router.push(
                  `/hotel/${row.original.hotelId}?type=edit&revNm=${
                    row.original.revName
                  }&startDate=${
                    row.original.revPeriod.split(" ~ ")[0]
                  }&endDate=${
                    row.original.revPeriod.split(" ~ ")[1]
                  }&visitMethod=${row.original.visitMethod}`
                )
              }
            />

            <CustomTooltip
              icon={faTrash}
              btnClass="mr-1 h-8 px-2 bg-[red] pb-1 hover:bg-[red]"
              text="삭제"
              type="icnBtn"
              onClick={async () => {
                const key = { userId: id, reserveId };
                const result = await deleteAxiosData(
                  `/api/myPage/${key.reserveId}`,
                  key
                );
                try {
                  if (result.code === 200) {
                    toast(msgType[result.message]);
                    getData();
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    const data = await getAxiosData(`/api/myPage/${id}`);

    const newArr = data?.data?.hotelList?.map((i: dataType) => {
      return {
        revId: i.reserveId,
        revName: i.revName,
        revCom: i.hotelInfo.ldgs_nm,
        visitMethod: i.visitMethod,
        revPeriod: `${i.startDate} ~ ${i.endDate}`,
        revDate: i.revDate,
        hotelId: i.hotelId,
      };
    });

    setData(newArr);
  };

  useEffect(() => {
    getData();
  }, []);

  const table = useReactTable({
    data: dataState,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiTable;
