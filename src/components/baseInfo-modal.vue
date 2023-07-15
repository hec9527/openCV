<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog"
    title="基本信息"
    :show-close="false"
    :width="720"
  >
    <ElForm ref="formRef" label-position="top" :model="modelData">
      <ElRow>
        <ElCol :span="14">
          <div>
            <ElFormItem label="姓名">
              <ElInput
                v-model="modelData.name"
                placeholder="如：陈晓晓 Alice Chang"
              />
            </ElFormItem>
            <ElFormItem label="电话">
              <ElInput
                v-model="modelData.phone"
                placeholder="如：188-8888-8888"
              />
            </ElFormItem>
            <ElFormItem label="邮箱">
              <ElInput
                v-model="modelData.email"
                placeholder="如：alice@foxmail.com"
              />
            </ElFormItem>
          </div>
        </ElCol>
        <ElCol :span="6" :offset="4">
          <div class="img-placeholder"></div>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="现居城市">
            <ElInput v-model="modelData.location" placeholder="如：四川成都" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="10" :offset="2">
          <ElFormItem label="年龄或者生日">
            <ElDatePicker
              v-model="modelData.birthDayOrAge"
              placeholder="请选择"
              type="month"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <div class="section-title">求职意向</div>
      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="当前状态">
            <ElSelect v-model="modelData.workStatus" placeholder="请选择">
              <ElSelect.Option
                v-for="status in WorkStatus"
                :key="status"
                :value="status"
              >
                {{ status }}
              </ElSelect.Option>
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="10" :offset="2">
          <ElFormItem label="意向城市">
            <ElInput
              v-model="modelData.intentCity"
              placeholder="如：四川成都"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="期望职业">
            <ElAutocomplete
              v-model="modelData.intentionPosition"
              :fetch-suggestions="getAutoCompleteData"
              placeholder="请输入"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="10" :offset="2">
          <ElFormItem label="期望薪资" class="salary-item">
            <ElSelect v-model="modelData.minSalary" placeholder="最低薪资">
              <ElSelect.Option v-for="n in 100" :key="n" :value="`${n}K`">
                <span>{{ n === 100 ? '100K以上' : `${n}K` }}</span>
              </ElSelect.Option>
            </ElSelect>
            <ElText>至</ElText>
            <ElSelect v-model="modelData.maxSalary" placeholder="最高薪资">
              <template v-for="n in 100" :key="n">
                <ElSelect.Option
                  v-if="
                    !modelData.minSalary || n > parseInt(modelData.minSalary)
                  "
                  :value="`${n}K`"
                >
                  <span>{{ n === 100 ? '100K以上' : `${n}K` }}</span>
                </ElSelect.Option>
              </template>
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <template #footer>
      <ElButton @click.stop="$emit('close')">取消</ElButton>
      <ElButton :type="'primary'" @click="handleSubmit(formRef)">保存</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import {
  ElText,
  ElRow,
  ElCol,
  ElDialog,
  ElInput,
  ElForm,
  ElSelect,
  ElButton,
  ElFormItem,
  ElDatePicker,
  ElAutocomplete,
  AutocompleteFetchSuggestions,
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { WorkStatus, JobPosition } from '@const/index';
import { reactive, watch, ref } from 'vue';
import { BaseInfo } from '@typings/index';

type IEmit = {
  (e: 'close'): void;
};

const props = defineProps<{ visible: boolean; data: BaseInfo }>();
defineEmits<IEmit>();

const modelData = reactive(props.data);
const formRef = ref<FormInstance>();

const getAutoCompleteData: AutocompleteFetchSuggestions = (query, callback) => {
  const data = JobPosition.filter((job) => {
    return job.includes(query);
  }).map((job) => {
    return { value: job };
  });
  callback(data);
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(modelData);

    if (valid) {
      //
    } else {
      console.log('validate error: ', fields);
    }
  });
};

watch([modelData], () => {
  if (parseInt(modelData.minSalary) == 100) {
    modelData.maxSalary = undefined;
  }

  if (
    modelData.maxSalary &&
    parseInt(modelData.maxSalary) < parseInt(modelData.minSalary)
  ) {
    modelData.maxSalary = modelData.minSalary + 1;
  }
});
</script>

<style lang="less">
.edit-dialog {
  .salary-item {
    .el-form-item__content {
      flex-wrap: unset;
    }
    .el-text {
      margin: 0 8px;
    }
  }

  .el-input,
  .el-select,
  .el-autocomplete,
  .el-date-editor.el-input {
    width: 100%;
  }

  // TODO delete
  .img-placeholder {
    width: 150px;
    height: 200px;
    margin-top: 30px;
    background: #6665;
  }
}
</style>
