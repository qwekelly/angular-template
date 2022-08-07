import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'

import { ModalEditIndexdbDataComponent } from '../index';


class Student {
  id: number;
  name: string;
  age: number;
  fraction: number;
}

@Component({
  selector: 'app-skill-indexdb',
  templateUrl: './skill-indexdb.component.html',
  styleUrls: ['./skill-indexdb.component.scss'],
})
export class SkillIndexdbComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'fraction', 'operation'];

  students = new MatTableDataSource<Student>([]);

  dataBaseName = 'student';
  version = 1;
  openRequest: IDBOpenDBRequest;
  database: IDBDatabase;
  dbStore: IDBObjectStore;

  searchKey = '';

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    // 打开一个名为'student'的数据库，版本为1
    this.openDataBase(this.dataBaseName, this.version);
  }

  openDataBase(dataBaseName: string, version?: number) {
    this.openRequest = window.indexedDB.open(dataBaseName, version);

    // 版本号不一致时触发，包括新库刚建立时也会触发。
    this.openRequest.onupgradeneeded =  (event) => {
      console.log('数据库升级中...', event);
      this.database = this.openRequest.result;

      // 检查是否已经有person表缓存，如果没有,建person表
      if (!this.database.objectStoreNames.contains('person')) {
       // 建表，设置主键id，值必须是唯一的
       const groupStore = this.database.createObjectStore('person', { keyPath: 'id', autoIncrement: true })

       // 建立索引 unique唯一
       groupStore.createIndex('id', 'id', { unique: true })
       groupStore.createIndex('name', 'name', { unique: false })
       groupStore.createIndex('age', 'age', { unique: false })
       groupStore.createIndex('fraction', 'fraction', { unique: false })
     }
    }
    this.openRequest.onsuccess = (event) => {
      console.log('连接数据库成功!', event);
      this.database = this.openRequest.result;

      // 初始化读数据库数据
      this.getDataFromDataBase();
    }
    this.openRequest.onerror = (event) => {
      console.log('连接数据库失败!', event);
    }
  }

  updateTransaction() {
    // 新建时必须指定表格名称和操作模式（"只读"或"读写"）。
    // 新建事务以后，通过IDBTransaction.objectStore(name)方法，拿到 IDBObjectStore 对象
    this.dbStore = this.database.transaction('person', 'readwrite').objectStore('person');
  }

  getDataFromDataBase() {
    // 先创建事务
    this.updateTransaction();

    const request = this.dbStore.getAll();

    request.onsuccess = () => {
      this.students.data = request.result || [];
      console.log('读取数据库的数据', this.students.data);
    }
    
    request.onerror = () => {
      console.log('读取数据库所有数据失败');
    }
  }

  addDataToDataBase(data: Student) {
    // 先创建事务
    this.updateTransaction();

    const request = this.dbStore.add(data);

    request.onsuccess = (event) => {
      console.log('数据写入成功');
      this.getDataFromDataBase();
    };
  
    request.onerror = (event) => {
      console.log('数据写入失败');
    }
  }

  deleteDataInDataBase(student: Student) {
    // 先创建事务
    this.updateTransaction();

    const request = this.dbStore.delete(student.id);

    request.onsuccess = (event) => {
      console.log('删除数据成功');
      this.getDataFromDataBase();
    };
  
    request.onerror = (event) => {
      console.log('删除数据失败');
    }
  }

  updateDataInDataBase(student: Student) {
    // 先创建事务
    this.updateTransaction();

    const request = this.dbStore.put(student);

    request.onsuccess = (event) => {
      console.log('更新数据成功');
      this.getDataFromDataBase();
    };
  
    request.onerror = (event) => {
      console.log('更新数据失败');
    }
  }

  getDataFromDataBaseBySearchKey() {
    // 先创建事务
    this.updateTransaction()

    const Index = this.dbStore.index('name');
    const request = Index.get(this.searchKey);

    request.onsuccess = (event) => {
      this.students.data = request.result ? [request.result] : [];
      console.log('搜索成功', this.students.data);
    };
  
    request.onerror = (event) => {
      console.log('搜索失败');
    }
  }

  applyFilter(value: string) {
    this.searchKey = value.trim();
    if (this.searchKey) {
      this.getDataFromDataBaseBySearchKey();
    } else {
      this.getDataFromDataBase();
    }
  }

  addData() {
    this.matDialog.open(ModalEditIndexdbDataComponent, {
      width: '500px',
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.addDataToDataBase(data);
      }
    })
  }

  deleteTrigger(student: Student) {
    this.deleteDataInDataBase(student);
  }

  ediTrigger(student: Student) {
    this.matDialog.open(ModalEditIndexdbDataComponent, {
      width: '500px',
      data: {
        student,
      }
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.updateDataInDataBase(Object.assign(student, data));
      }
    })
  }
}
