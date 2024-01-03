import {
  Button,
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FilterIcon } from "./icons";
import { years } from "@/utils/helper";

export const Filter = ({
  onClearAll,
  onClearSelected,
  onSelect,
}: {
  onClearAll: () => void;
  onClearSelected: () => void;
  onSelect: (value: string) => void;
}) => {
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div className="flex items-center gap-1">
      {selectedYear && (
        <>
          <Chip
            onClose={() => {
              setSelectedYear("");
              onClearSelected();
            }}
            variant="shadow"
            color="primary"
          >
            {selectedYear}
          </Chip>
        </>
      )}
      <Popover placement="bottom-end" showArrow>
        <PopoverTrigger>
          <Button
            variant="light"
            size="sm"
            radius="full"
            color="primary"
            isIconOnly
          >
            <FilterIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <div className="flex justify-between items-center mb-2">
                <p
                  className="text-tiny font-bold text-foreground"
                  {...titleProps}
                >
                  Filter Search Results
                </p>
                <p
                  role="button"
                  onClick={() => {
                    onClearAll();
                    setSelectedYear("");
                  }}
                  className="text-red-500 text-tiny cursor-pointer hover:text-red-700"
                >
                  Clear All
                </p>
              </div>
              <Divider />
              <Select
                aria-label="Select"
                label="By release year"
                labelPlacement="outside"
                className="pt-2"
                size="sm"
                selectedKeys={[selectedYear]}
                disabledKeys={[selectedYear]}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  onSelect(e.target.value);
                }}
              >
                {years.map((year) => (
                  <SelectItem key={year} textValue={String(year)} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
