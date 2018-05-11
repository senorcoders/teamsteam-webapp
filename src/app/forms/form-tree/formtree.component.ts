import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

const actionMapping:IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};


@Component({
    selector: 'ms-fulltree',
    templateUrl:'./formtree-component.html',
    styleUrls: ['./formtree-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class FormTreeComponent implements OnInit {

    nodes: any[];
    nodes2 = [{name: 'root'}, {name: 'root2'}];
    constructor(private pageTitleService: PageTitleService) {}
    ngOnInit() {
        this.pageTitleService.setTitle("Tree");
        setTimeout(() => {
            this.nodes = [
            {
                expanded: true,
                name: 'root expanded',
                subTitle: 'the root',
                children: [
                {
                    name: 'child1',
                    subTitle: 'a good child',
                    hasChildren: false
                }, {
                    name: 'child2',
                    subTitle: 'a bad child',
                    hasChildren: false
                }
              ]
            },
            {
                name: 'root2',
                subTitle: 'the second root',
                children: [
                {
                    name: 'child2.1',
                    subTitle: 'new and improved',
                    hasChildren: false
                }, {
                    name: 'child2.2',
                    subTitle: 'new and improved2',
                    children: [
                    {
                        uuid: 1001,
                        name: 'subsub',
                        subTitle: 'subsub',
                        hasChildren: false
                    }
                  ]
                }
              ]
            },
            {
                name: 'asyncroot',
                hasChildren: true
            }
          ];
        }, 1);
  }

  asyncChildren = [
    {
        name: 'child2.1',
        subTitle: 'new and improved'
    }, {
        name: 'child2.2',
        subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  addNode(tree) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: true,
    useVirtualScroll: true
  }
  
  onEvent(event) {
    console.log(event);
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }
  
}



