# Process for Orchestrating a Spec's Implementation

Now that we have a spec and tasks list ready for implementation, we will proceed with orchestrating implementation of each task group by a dedicated agent using the following MULTI-PHASE process.

Follow each of these phases and their individual workflows IN SEQUENCE:

## Multi-Phase Process

### FIRST: Get tasks.md for this spec

IF you already know which spec we're working on and IF that spec folder has a `tasks.md` file, then use that and skip to the NEXT phase.

IF you don't already know which spec we're working on and IF that spec folder doesn't yet have a `tasks.md` THEN output the following request to the user:

```
Please point me to a spec's `tasks.md` that you want to orchestrate implementation for.

If you don't have one yet, then run any of these commands first:
/shape-spec
/write-spec
/create-tasks
```

### NEXT: Create orchestration.yml to serve as a roadmap for orchestration of task groups

In this spec's folder, create this file: `agent-os/specs/[this-spec]/orchestration.yml`.

Populate this file with with the names of each task group found in this spec's `tasks.md` and use this EXACT structure for the content of `orchestration.yml`:

```yaml
task_groups:
  - name: [task-group-name]
  - name: [task-group-name]
  - name: [task-group-name]
  # Repeat for each task group found in tasks.md
```

### NEXT: Assign subagents to each task group

Analyze each task group and automatically assign the most appropriate subagent based on the nature of the tasks. Consider factors such as:
- Task type (backend, frontend, database, testing, etc.)
- Required expertise and tools
- Dependencies between task groups

After analysis, update `orchestration.yml` to specify the assigned subagent names. `orchestration.yml` should end up looking like this:

```yaml
task_groups:
  - name: [task-group-name]
    claude_code_subagent: [subagent-name]
  - name: [task-group-name]
    claude_code_subagent: [subagent-name]
  - name: [task-group-name]
    claude_code_subagent: [subagent-name]
  # Repeat for each task group found in tasks.md
```

For example, after this step, the `orchestration.yml` file might look like this (exact names will vary):

```yaml
task_groups:
  - name: authentication-system
    claude_code_subagent: backend-specialist
  - name: user-dashboard
    claude_code_subagent: frontend-specialist
  - name: api-endpoints
    claude_code_subagent: backend-specialist
```


### NEXT: Delegate task groups implementations to assigned subagents IN PARALLEL

Analyze dependencies between task groups and identify which groups can be executed in parallel. Then delegate implementations to subagents with MAXIMUM PARALLELIZATION:

1. **Dependency Analysis**: Identify task groups that have no dependencies on each other
2. **Parallel Execution**: Launch multiple subagents simultaneously for independent task groups
3. **Sequential Execution**: Only execute sequentially when there are explicit dependencies

For each delegation, provide the subagent with:
- The task group (including the parent task and all sub-tasks)
- The spec file: `agent-os/specs/[this-spec]/spec.md`
- Instruct subagent to:
  - Perform their implementation
  - Check off the task and sub-task(s) in `agent-os/specs/[this-spec]/tasks.md`

**IMPORTANT**: Always prefer parallel execution. Use a single message with multiple Task tool calls to launch independent subagents concurrently.
