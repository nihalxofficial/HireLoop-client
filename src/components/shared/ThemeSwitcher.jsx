"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";


export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (

    <Switch defaultSelected size="md" onChange={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {({ isSelected }) => (
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon>
              {isSelected ? (
                <Sun className="size-3 text-inherit opacity-100" />
              ) : (
                <Moon className="size-3 text-inherit opacity-70" />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      )}
    </Switch>
  );
}