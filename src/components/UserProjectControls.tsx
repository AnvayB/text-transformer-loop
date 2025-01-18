import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function UserProjectControls() {
  const [users, setUsers] = useState(["User 1", "User 2"]);
  const [projects, setProjects] = useState(["Project 1", "Project 2"]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [selectedProject, setSelectedProject] = useState<string>();

  const handleSaveData = () => {
    console.log("Saving data to JSON...");
    // Here you would typically save the data to your backend
  };

  const handleCreateUser = () => {
    const newUser = `User ${users.length + 1}`;
    setUsers((prev) => [...prev, newUser]);
    console.log("Creating new user:", newUser);
  };

  const handleCreateProject = () => {
    const newProject = `Project ${projects.length + 1}`;
    setProjects((prev) => [...prev, newProject]);
    console.log("Creating new project:", newProject);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-muted/50 rounded-lg">
      <Select value={selectedUser} onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project} value={project}>
              {project}
            </SelectItem>
          ))}
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