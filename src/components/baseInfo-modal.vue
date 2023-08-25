<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog"
    title="基本信息"
    :lock-scroll="true"
    :show-close="false"
    :width="720"
  >
    <ElForm
      ref="formRef"
      label-position="top"
      :model="modelData"
      :rules="rules"
    >
      <ElRow>
        <ElCol :span="14">
          <div>
            <ElFormItem label="姓名" prop="name">
              <ElInput
                v-model="modelData.name"
                placeholder="如：陈晓晓 Alice Chang"
              />
            </ElFormItem>
            <ElFormItem label="电话" prop="phone">
              <ElInput
                v-model.number="modelData.phone"
                maxlength="11"
                minlength="11"
                placeholder="如：188-8888-8888"
              />
            </ElFormItem>
            <ElFormItem label="邮箱" prop="email">
              <ElInput
                v-model="modelData.email"
                placeholder="如：alice@foxmail.com"
              />
            </ElFormItem>
          </div>
        </ElCol>
        <ElCol :span="6" :offset="4" prop="avatar">
          <ElTooltip :content="'添加头像信息，获取更多曝光'" :placement="'top'">
            <label class="avatar-warp" for="avatar-upload">
              <input
                id="avatar-upload"
                type="file"
                @change="handleSelectAvatar"
              />
              <img v-if="modelData.avatar" :src="modelData.avatar" />
              <div v-else class="img-placeholder">
                <upload-picture
                  :stroke-width="3"
                  theme="outline"
                  size="24"
                  fill="#333"
                />
                <span>点击上传</span>
              </div>
            </label>
          </ElTooltip>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="现居城市" prop="location">
            <ElInput v-model="modelData.location" placeholder="如：四川成都" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="10" :offset="2" style="position: relative">
          <ElFormItem label="年龄或者生日" prop="birthDayOrAge">
            <ElDatePicker
              v-model="modelData.birthDayOrAge"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              placeholder="请选择"
              type="month"
            />
            <div v-if="ageType === 'age' && currentAge" class="age-wrap">
              {{ currentAge }}
            </div>
          </ElFormItem>
          <div class="age-type-wrap">
            <ElRadio.RadioGroup v-model="ageType">
              <ElRadio label="age">年龄</ElRadio>
              <ElRadio label="birth">生日</ElRadio>
            </ElRadio.RadioGroup>
          </div>
        </ElCol>
      </ElRow>

      <div class="section-title">求职意向</div>
      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="当前状态" prop="workStatus">
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
          <ElFormItem label="意向城市" prop="intentCity">
            <ElInput
              v-model="modelData.intentCity"
              placeholder="如：四川成都"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="期望职业" prop="intentionPosition">
            <ElAutocomplete
              v-model="modelData.intentionPosition"
              :fetch-suggestions="getAutoCompleteData"
              placeholder="请输入"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="10" :offset="2">
          <ElFormItem label="期望薪资" class="salary-item" prop="minSalary">
            <ElSelect v-model="modelData.minSalary" placeholder="最低薪资">
              <ElSelect.Option
                v-for="n in 100"
                :key="n"
                :value="n === 100 ? '100K以上' : `${n}k`"
              >
                <span>{{ n === 100 ? '100K以上' : `${n}k` }}</span>
              </ElSelect.Option>
            </ElSelect>
            <template v-if="parseInt(modelData.minSalary) < 100">
              <ElText>至</ElText>
              <ElSelect v-model="modelData.maxSalary" placeholder="最高薪资">
                <template v-for="n in 100" :key="n">
                  <ElSelect.Option
                    v-if="
                      !modelData.minSalary || n > parseInt(modelData.minSalary)
                    "
                    :value="`${n}k`"
                  >
                    <span>{{ n === 100 ? '100K以上' : `${n}k` }}</span>
                  </ElSelect.Option>
                </template>
              </ElSelect>
            </template>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <template #footer>
      <ElButton @click.stop="$emit('close')">取消</ElButton>
      <ElButton :type="'primary'" @click.stop="handleSubmit(formRef)"
        >保存</ElButton
      >
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
  ElRadio,
  ElSelect,
  ElButton,
  ElMessage,
  ElTooltip,
  ElFormItem,
  ElDatePicker,
  ElAutocomplete,
  AutocompleteFetchSuggestions,
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { WorkStatus, JobPosition } from '@const/index';
import { reactive, watch, ref, computed } from 'vue';
import { BaseInfo } from '@typings/index';
import { UploadPicture } from '@icon-park/vue-next';

type IEmit = {
  (e: 'close'): void;
  (e: 'save', data: BaseInfo): void;
};

const emits = defineEmits<IEmit>();
const props = defineProps<{ visible: boolean; data: BaseInfo }>();

const modelData = reactive(props.data);
const formRef = ref<FormInstance>();
const ageType = ref<'age' | 'birth'>('birth');

const rules = reactive<FormRules<BaseInfo>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 75, message: '姓名长度限制2到75个汉字', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请填写联系电话，方便联系', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: '请填写邮箱，用于交流和接收office',
      trigger: 'blur',
    },
  ],
  birthDayOrAge: [{ required: true, message: '请选择出生日期' }],
  minSalary: [{ required: true, message: '请选择期望薪资' }],
  intentionPosition: [
    { required: true, message: '请选择或者输入期望工作岗位' },
  ],
});

const getAutoCompleteData: AutocompleteFetchSuggestions = (query, callback) => {
  const data = JobPosition.filter((job) => {
    return job.includes(query);
  }).map((job) => {
    return { value: job };
  });
  callback(data);
};

const handleSelectAvatar = (event: any) => {
  const file = event.target?.files?.[0];
  const TWO_MB = 2 * 1024 * 1024;
  if (file) {
    console.log(file);
    if (file.size > TWO_MB) {
      ElMessage({
        type: 'error',
        message: '本地存储空间有限，最大支持2MB图片',
      });
    } else {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target?.result;
        if (data) {
          modelData.avatar = data;
        }
      };

      reader.readAsDataURL(file);
    }
  }
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = { ...modelData };
      if (ageType.value === 'age') {
        data.birthDayOrAge = currentAge.value;
      }

      emits('save', data);
    } else if (fields) {
      const key = Object.keys(fields as object)[0];
      ElMessage({ type: 'error', message: fields[key][0].message });
    }
  });
};

const currentAge = computed<string>(() => {
  if (!modelData.birthDayOrAge) return '';
  const now = new Date();
  const inputDate = new Date(modelData.birthDayOrAge);
  let diffInYears = now.getFullYear() - inputDate.getFullYear();

  if (
    now.getMonth() < inputDate.getMonth() ||
    (now.getMonth() === inputDate.getMonth() &&
      now.getDate() < inputDate.getDate())
  ) {
    diffInYears -= 1;
  }

  return diffInYears + '岁';
});

watch([modelData], () => {
  if (parseInt(modelData.minSalary) == 100) {
    modelData.maxSalary = undefined;
  }

  if (
    modelData.maxSalary &&
    parseInt(modelData.maxSalary) < parseInt(modelData.minSalary)
  ) {
    modelData.maxSalary = parseInt(modelData.minSalary) + 1 + 'k';
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

  .age-type-wrap {
    position: absolute;
    top: 0;
    right: 0;

    .el-radio:not(:last-of-type) {
      height: 22px;
      margin-right: 12px;
    }
  }

  .age-wrap {
    position: absolute;
    background-color: #fff;
    width: calc(100% - 60px);
    height: calc(100% - 4px);
    line-height: 28px;
    margin-left: 32px;
    pointer-events: none;
  }

  .avatar-warp {
    width: 150px;
    height: 200px;
    display: block;
    cursor: pointer;

    #avatar-upload {
      display: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
    }

    .img-placeholder {
      width: 100%;
      height: 100%;
      background: #ccc5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #999;

      svg {
        width: 40px;
        height: 40px;

        path {
          stroke: #999;
          fill: #999;
        }
      }
    }
  }
}
</style>
