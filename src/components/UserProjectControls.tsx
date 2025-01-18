import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserProjectControls() {
  const handleSaveData = () => {
    console.log("Saving data to JSON...");
  };

  const handleCreateUser = () => {
    console.log("Creating new user...");
  };

  const handleCreateProject = () => {
    console.log("Creating new project...");
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-muted/50 rounded-lg">
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user1">User 1</SelectItem>
          <SelectItem value="user2">User 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="project1">Project 1</SelectItem>
          <SelectItem value="project2">Project 2</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={handleCreateUser} variant="outline">
          New User
        </Button>
        <Button onClick={handleCreateProject} variant="outline">
          New Project
        </Button>
        <Button onClick={handleSaveData}>Save Data</Button>
      </div>
    </div>
  );
}