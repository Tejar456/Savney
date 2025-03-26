<template>
    <div>
        <h1 class="text-center text-3xl font-semibold my-4 text-primary">
            Auto Cut Balance
        </h1>
        <form class="w-full px-10">
            <div class="mb-6">
                <label for="balanch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Balanch</label>
                <input type="number" id="balanch"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    value="4.800.000" readonly />
            </div>
            <div class="mb-6">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount</label>
                <input type="number" id="amount"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Rp." required />
            </div>
            <div class="mb-6">
                <label for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input type="text" id="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Food" required />
            </div>
            <div class="mb-6">
                <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                    option</label>
                <select id="categories"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary">
                    <option selected>Select Categoris</option>
                    <option value="US">Food</option>
                    <option value="CA">Transportation</option>
                    <option value="FR">Invest</option>
                    <option value="DE">Other</option>
                </select>
            </div>

            <div class="relative mb-6">
                <div class="absolute inset-y-12 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <label for="datepicker-custom"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input id="datepicker-custom" type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Select date">
            </div>

            <button type="submit"
                class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-6">
                Add
            </button>
        </form>
    </div>
</template>




<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

// initialize components based on data attribute selectors
onMounted(() => {

    useFlowbite((flowbite) => {
        // set the target element of the input field
        const $datepickerEl = document.getElementById('datepicker-custom');

        // optional options with default values and callback functions
        const options = {
            defaultDatepickerId: null,
            autohide: false,
            format: 'mm/dd/yyyy',
            maxDate: null,
            minDate: null,
            orientation: 'bottom',
            buttons: false,
            autoSelectToday: false,
            title: null,
            language: 'en',
            rangePicker: false,
            onShow: () => { },
            onHide: () => { },
        };

        const instanceOptions = {
            id: 'datepicker-custom-example',
            override: true
        };

        const datepicker = new Datepicker($datepickerEl, options, instanceOptions);
    });

})
</script>
