<template>
  <div class="home">
    <div class="top">
      <h1 class="title">Library System</h1>
      <ul class="menu">
        <li v-if="!userId">
          <router-link to="/login">LOGIN</router-link>
          &nbsp;&nbsp;
          <router-link to="/register">REGISTER</router-link>
        </li>
        <li v-else>
          <span @click="handleRecord">Check borrowed record</span>
          &nbsp;&nbsp;
          <span v-if="is_admin" @click="toAdd()">Add book</span>
          &nbsp;&nbsp;
          <span @click="logout">logout</span>
        </li>
      </ul>
      <el-dialog
        :title="`${userName}'s borrow records`"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="() => (dialogVisible = false)"
      >
        <el-table class="table" border :data="data">
          <el-table-column
            prop="title"
            label="title"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="bookId"
            label="bookId"
            width="180"
          ></el-table-column>
          <el-table-column prop="author" label="author"></el-table-column>
          <el-table-column prop="endDate" label="endDate"></el-table-column>
          <el-table-column label="action">
            <template slot-scope="scope">
              <el-button @click="toRecord(scope.row)" type="text" size="small">
                <span style="color:red">return</span>
              </el-button>
              <el-button @click="toRenew(scope.row)" type="text" size="small">
                <span style="color:#000">renew</span>
              </el-button>
              <el-button @click="toReview(scope.row)" type="text" size="small">
                <span style="color:#000">review</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogVisible = false">
            cancel
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">
            confirm
          </el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="review"
        :before-close="() => (reviewContent = '')"
        :visible.sync="reviewVis"
        width="800px"
      >
        <el-input type="textarea" v-model="reviewContent"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="reviewVis = false">
            cancel
          </el-button>
          <el-button type="primary" @click="handleReview()">
            review
          </el-button>
        </span>
      </el-dialog>
    </div>
    <div class="main">
      <h1 class="title">Books for Everyone!</h1>
      <el-input
        @keydown.enter.native="Search()"
        class="input"
        v-model="keyword"
      />
      <br />
      <el-button @click.native="Search()" class="btn" type="warning" round>
        Search
      </el-button>
      <el-table class="table" border v-if="tableData.length" :data="tableData">
        <el-table-column
          prop="title"
          label="title"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="bookId"
          label="bookId"
          width="100"
        ></el-table-column>
        <el-table-column prop="author" label="author"></el-table-column>
        <el-table-column prop="stock" label="stock"></el-table-column>
        <el-table-column
          prop="publicationYear"
          label="publicationYear"
        ></el-table-column>
        <el-table-column prop="review" label="review">
          <template slot-scope="scope">
            <span
              style="margin-left: 5px;color:#000"
              v-for="(item, index) in scope.row.review"
              :key="index"
            >
              {{ `"${item}"` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="action" width="150">
          <template slot-scope="scope">
            <el-button
              @click="toBorrow(scope.row)"
              :disabled="!userId"
              type="text"
              size="small"
            >
              <span style="color:#000">borrow</span>
            </el-button>
            <el-button
              v-if="is_admin"
              @click="toDel(scope.row)"
              type="text"
              size="small"
            >
              <span style="color:red">remove</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="Add Book"
        :visible.sync="addVis"
        width="800px"
        :before-close="() => (addVis = false)"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="bookId" prop="bookId">
            <el-input v-model="form.bookId"></el-input>
          </el-form-item>
          <el-form-item label="title" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="author" prop="author">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="stock" prop="stock">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
          <el-form-item label="publicationYear" prop="publicationYear">
            <el-input v-model="form.publicationYear"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">
              confirm
            </el-button>
            <el-button type="danger" @click="addVis = false">cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  searchBook,
  recordBook,
  returnBook,
  renewBook,
  borrowBook,
  addBook,
  removeBook,
  reviewBook
} from '@/api/book'
export default {
  name: 'Home',
  data () {
    return {
      keyword: '',
      tableData: [],
      userId: null,
      dialogVisible: false,
      addVis: false,
      data: [],
      form: {},
      rules: {},
      is_admin: false,
      userName: '',
      reviewVis: false,
      reviewId: null,
      reviewContent: ''
    }
  },
  created () {
    this.userId =
      JSON.parse(window.localStorage.getItem('userInfo'))?.userId ?? false
    this.userName =
      JSON.parse(window.localStorage.getItem('userInfo'))?.userName ?? ''
    this.is_admin =
      JSON.parse(window.localStorage.getItem('userInfo'))?.role === 'admin' ??
      false
  },
  methods: {
    async Search () {
      try {
        const res = await searchBook({ keyword: this.keyword })
        this.tableData = res
      } catch (error) {
        console.log(error)
      }
    },
    async recordBook () {
      try {
        const res = await recordBook({ userId: this.userId })
        this.data = res
      } catch (error) {
        console.log(error)
      }
    },
    handleRecord () {
      this.recordBook()
      this.dialogVisible = true
    },
    async toBorrow (item) {
      try {
        const res = await borrowBook({
          bookId: item.bookId,
          userId: this.userId
        })
        this.$message({
          message: res.message,
          type: res?.result ? 'success' : 'error'
        })
      } catch (error) {
        console.log(error)
      }
    },
    async toRecord (item) {
      try {
        const res = await returnBook({
          bookId: item.bookId,
          userId: this.userId
        })
        this.$message({
          message: res.message,
          type: res?.result ? 'success' : 'error'
        })
      } catch (error) {
        console.log(error)
      }
    },
    async toRenew (item) {
      try {
        const res = await renewBook({
          bookId: item.bookId,
          userId: this.userId
        })
        this.$message({
          message: res.message,
          type: res?.result ? 'success' : 'error'
        })
      } catch (error) {
        console.log(error)
      }
    },
    toAdd () {
      this.addVis = true
    },
    logout () {
      window.localStorage.removeItem('userInfo')
      this.$store.commit('SET_USERINFO', {})
      window.location.reload()
    },
    toReview (item) {
      this.reviewVis = true
      this.reviewId = item.bookId
    },
    async handleReview () {
      const res = await reviewBook({
        bookId: this.reviewId,
        content: this.reviewContent
      })
      this.$message({
        message: res.message,
        type: res?.result ? 'success' : 'error'
      })
      this.reviewVis = false
    },
    toDel (item) {
      try {
        this.$alert('Are you sure to remove it?', {
          confirmButtonText: 'yes',
          callback: async () => {
            const res = await removeBook({
              bookId: item.bookId,
              userId: this.userId
            })
            this.$message({
              message: res.message,
              type: res?.result ? 'success' : 'error'
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async handleAdd () {
      try {
        const res = await addBook(this.form)
        this.$message({
          message: res.message,
          type: res?.result ? 'success' : 'error'
        })
        this.addVis = false
        this.form = {}
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less">
.home {
  input.el-input__inner {
    border-radius: 20px;
  }
  .el-message-box__message > p {
    color: #000;
  }
  .cell {
    color: #000;
  }
  label.el-form-item__label {
    color: #000 !important;
  }
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 22px;
    }
    .menu {
      display: flex;
      > li {
        margin-left: 20px;
        font-size: 22px;
        cursor: pointer;
        > a {
          font-size: 22px;
        }
      }
    }
  }
  .main {
    text-align: center;
    padding-top: 200px;
    .title {
      font-size: 30px;
    }
    .input {
      width: 520px;
      margin-top: 10px;
      border-radius: 20px;
    }
    .btn {
      color: #000;
      width: 120px;
      margin-top: 20px;
    }
    .table {
      margin: 0 auto;
      margin-top: 20px;
      width: 820px;
    }
  }
}
</style>
