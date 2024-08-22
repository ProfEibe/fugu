import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { JsonPipe } from '@angular/common';
import { TreeModule, TreeNodeExpandEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-access',
  standalone: true,
  imports: [Button, JsonPipe, TreeModule, InputTextareaModule, FormsModule],
  templateUrl: './file-access.component.html',
  styleUrl: './file-access.component.css',
})
export class FileAccessComponent {
  treeNodes: TreeNode<FileSystemHandle>[] = [];
  selectedFile: TreeNode<FileSystemHandle> | undefined = undefined;
  fileContent = '';

  /* Directories */
  async openFSDirectory() {
    if ('showDirectoryPicker' in self) {
      const directory = await window.showDirectoryPicker();

      this.treeNodes = await this.convertDirectoryContentToTreeNodes(directory);
    }
  }

  async loadTreeDirectory($event: TreeNodeExpandEvent) {
    if (!(!$event.node.children || $event.node.children.length === 0)) {
      return;
    }
    $event.node.loading = true;
    const dir = $event.node.data;
    if (!dir) {
      return;
    }
    $event.node.children = await this.convertDirectoryContentToTreeNodes(dir);
    $event.node.loading = false;
  }

  private async convertDirectoryContentToTreeNodes(directory: FileSystemDirectoryHandle): Promise<TreeNode[]> {
    let nodes: TreeNode[] = [];

    for await (const handle of directory.values()) {
      nodes.push({
        label: handle.name,
        data: handle,
        children: [],
        leaf: handle.kind === 'file',
        icon: handle.kind === 'file' ? 'pi pi-file' : undefined,
        collapsedIcon: 'pi pi-folder',
        expandedIcon: 'pi pi-folder-open',
      });
    }

    // filter Nodes by label starting with '.'
    nodes = nodes.filter((node) => {
      return !node.label?.startsWith('.');
    });

    // sort treeNodes by data.kind
    nodes.sort((a, b) => {
      if (!a.data || !b.data) {
        return 0;
      }
      return a.data.kind.localeCompare(b.data.kind);
    });

    return nodes;
  }

  /* Files */
  async loadFile($event: TreeNodeSelectEvent) {
    const handle: FileSystemFileHandle = $event.node.data;

    if (!handle || handle.kind !== 'file') {
      return;
    }

    const file = await handle.getFile();
    console.log(file.type);

    this.fileContent = await file.text();
  }
}
