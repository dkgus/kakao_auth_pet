"use client";

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
import { useState } from "react";

import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import CustomTooltip from "@/components/providers/CustomTooltip";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableType } from "@/lib/utils";
import {
  faCopy,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MultiTable = (props: {
  dataState: TableType[];
  deleteFunc: (reserveId: string) => void;
}) => {
  const { dataState, deleteFunc } = props;

  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TableType>[] = [
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
                  }&visitMethod=${row.original.visitMethod}&revId=${
                    row.original.revId
                  }`
                )
              }
            />

            <CustomTooltip
              icon={faTrash}
              btnClass="mr-1 h-8 px-2 bg-[red] pb-1 hover:bg-[red]"
              text="삭제"
              type="icnBtn"
              onClick={() => {
                toast("정말 예약을 취소하시겠습니까?", {
                  description: "취소는 복구되지않습니다.",
                  action: {
                    label: "삭제",
                    onClick: () => deleteFunc(reserveId),
                  },
                  closeButton: true,
                });
              }}
            />
          </div>
        );
      },
    },
  ];

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
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <div className="text-[20px]">예약 리스트</div>
        <Input
          placeholder="예약 리스트를 조회해보세요!"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table className="font-[13px]">
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
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel()?.rows?.map((row) => (
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
        <div className="text-sm text-muted-foreground">
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
            onClick={(e) => table.nextPage()}
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
