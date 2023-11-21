import { type Project } from "@prisma/client";
import { useRef, useState } from "react";
import { type AddProjectInput } from "~/server/api/routers/project/procedures/add";
import { api } from "~/utils/api";
import { Button, Editor, Input } from "../base";

export type ProjectMutation = AddProjectInput & { id?: number };

export type ProjectFormProps = {
  project?: ProjectMutation;
  onSubmitted?: (project: Project) => void;
};

const defaultValue: ProjectMutation & { id?: number } = {
  id: undefined,
  name: "",
  repository: "",
  description: "",
};
export const ProjectForm = (props: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectMutation>(
    props.project ?? defaultValue,
  );
  const { mutate: addProjectMutation } = api.project.addProject.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      handleReset();
      props.onSubmitted?.(data);
    },
  });

  const { mutate: editProjectMutation } = api.project.editProject.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      handleReset();
      props.onSubmitted?.(data);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (project.id) {
      editProjectMutation({
        id: project.id,
        name: project.name,
        repository: project.repository,
        description: project.description,
      });
      return;
    }
    addProjectMutation(project);
  };

  const handleReset = () => {
    setProject(defaultValue);
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="flex w-full flex-col"
      onSubmit={handleSubmit}
    >
      <Input
        value={project.name}
        onChange={(e) => setProject({ ...project, name: e.target.value })}
        label="Project Name"
        required
      />
      <Input
        value={project.repository}
        onChange={(e) => setProject({ ...project, repository: e.target.value })}
        label="Repository"
        type="url"
        required
      />
      <Editor
        label="Description"
        value={project.description}
        onChange={(value) => setProject({ ...project, description: value })}
      />
      <div className="mt-2 flex gap-1">
        <Button type="submit" variant="success" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </Button>
        <Button type="button" onClick={handleReset}>
          Clear
        </Button>
      </div>
    </form>
  );
};
