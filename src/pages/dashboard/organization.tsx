import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

type Project = {
  name: string;
  key: string;
  lead: string;
  category: string;
  updatedAt: string;
};

import { Input } from "@/components/ui/input";

const data = [
  {
    name: "Project Apollo",
    key: "APOL",
    lead: "Alice Johnson",
    category: "Software",
    updatedAt: "2025-05-10",
  },
  {
    name: "Project Zephyr",
    key: "ZEPH",
    lead: "Bob Smith",
    category: "Marketing",
    updatedAt: "2025-05-18",
  },
  {
    name: "Project Orion",
    key: "ORIO",
    lead: "Carol White",
    category: "Infrastructure",
    updatedAt: "2025-04-30",
  },
  {
    name: "Project Titan",
    key: "TITN",
    lead: "Dave Wilson",
    category: "Finance",
    updatedAt: "2025-05-01",
  },
  {
    name: "Project Nova",
    key: "NOVA",
    lead: "Eva Brown",
    category: "Research",
    updatedAt: "2025-05-20",
  },
];
const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
  },
  {
    accessorKey: "key",
    header: "Project Key",
  },
  {
    accessorKey: "lead",
    header: "Project lead",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ column, getValue }) => {
      const value = getValue() as string;
      return (
        <>
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting();
            }}>
            {value}
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ getValue }) => {
      const key = getValue() as string;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(key)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Organization = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="min-h-screen">
      <div className="header h-10 bg-blue-400"></div>
      <div className="navbar flex gap-4">
        <div className="Applications">
          <p>Applications</p>
        </div>
        <div className="Project">
          <p>Projects</p>
        </div>
        <div className="Issues">
          <p>Issues</p>
        </div>
        <div className="User Management">
          <p>User Management</p>
        </div>
      </div>
      <div className="rounded-md border pl-20 py-4">
        <div className="flex justify-between pr-10">
          <Input
            placeholder="Filter projects..."
            className="rounded-none max-w-lg"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
          />
          <Button>Create Project</Button>
        </div>
        <div className="py-4">
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
                    data-state={row.getIsSelected() && "selected"}>
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
                    className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size={"sm"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button
              variant="outline"
              size={"sm"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
