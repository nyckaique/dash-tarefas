"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ selected, onChange }: Props) {
  return (
    <Select value={selected} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[180px] bg-white">
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Todos">Todos</SelectItem>
        <SelectItem value="Trabalho">Trabalho</SelectItem>
        <SelectItem value="Pessoal">Pessoal</SelectItem>
        <SelectItem value="Estudos">Estudos</SelectItem>
      </SelectContent>
    </Select>
  );
}
