<script>
  // @ts-nocheck
  import classNames from 'classnames'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import duration from 'dayjs/plugin/duration'
  import { afterUpdate } from 'svelte'
  import icon from '../../assets/images/icon-arrow.svg'
  let day = 0
  let month = 0
  let year = 0
  let dayInvalid = false
  let monthInvalid = false
  let yearInvalid = false
  let errorMsg = 'This field is required'
  let dayErrorMsg = errorMsg
  let monthErrorMsg = errorMsg
  let yearErrorMsg = errorMsg
  let yearDiv
  let monthDiv
  let dayDiv

  dayjs.extend(customParseFormat)
  dayjs.extend(duration)

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      if (obj) obj.innerHTML = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  afterUpdate(() => {
    animateValue(yearDiv, 0, year, 500)
    animateValue(monthDiv, 0, month, 500)
    animateValue(dayDiv, 0, day, 500)
  })

  function dateValidation(dayInput, monthInput, yearInput) {
    if (dayInput > 31 || dayInput < 1) {
      dayInvalid = true
      dayErrorMsg = 'Must be a valid day'
    } else {
      dayInvalid = false
    }
    if (monthInput > 12 || monthInput < 0) {
      monthInvalid = true
      monthErrorMsg = 'Must be a valid month'
    } else {
      monthInvalid = false
    }
    if (yearInput > 2024 || yearInput < 0) {
      yearInvalid = true
      yearErrorMsg = 'Must be in the past'
    } else {
      yearInvalid = false
    }

    if (!dayInvalid && !monthInvalid && !yearInvalid) {
      const inputIsValid = dayjs(
        `${dayInput}/${monthInput}/${yearInput}`,
        'D/M/YYYY',
        true
      ).isValid()

      if (inputIsValid) {
        dayInvalid = false
        monthInvalid = false
        yearInvalid = false

        const now = dayjs()
        const input = dayjs(`${dayInput}/${monthInput}/${yearInput}`, 'D/M/YYYY')
        const diff = dayjs.duration(now.diff(input))

        day = diff.$d.days
        month = diff.$d.months
        year = diff.$d.years
      } else {
        dayInvalid = true
        monthInvalid = true
        yearInvalid = true
        dayErrorMsg = 'Must be a valid date'
        monthErrorMsg = ''
        yearErrorMsg = ''
      }
    }
  }

  function handleSubmit(e) {
    const formData = new FormData(e.target)

    const data = {
      day: 0,
      month: 0,
      year: 0
    }
    for (let field of formData) {
      const [key, value] = field
      data[key] = value
    }

    if ((!data.day, !data.month, !data.year)) {
      dayInvalid = true
      monthInvalid = true
      yearInvalid = true
      dayErrorMsg = errorMsg
      monthErrorMsg = errorMsg
      yearErrorMsg = errorMsg
    } else {
      dateValidation(data.day, data.month, data.year)
    }
  }
</script>

<div>
  <div
    class="w-[350px] rounded-3xl rounded-br-[100px] bg-white px-6 py-12 md:w-[800px] md:rounded-br-[200px] md:p-12"
  >
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-row space-x-2 pr-12 md:space-x-8">
        <label class="flex flex-col items-start">
          <p
            class={classNames(
              'mb-2 text-sm font-bold uppercase tracking-widest text-smokey-grey md:tracking-[0.15em]',
              {
                'text-red-500': dayInvalid
              }
            )}
          >
            day
          </p>
          <input
            name="day"
            type="number"
            placeholder="DD"
            class={classNames(
              'peer w-24 cursor-pointer rounded-lg border-[1px] border-light-grey p-3 text-2xl font-extrabold focus-visible:outline-purple-unique md:w-36 md:p-4',
              {
                'ring-1 ring-red-500': dayInvalid
              }
            )}
          />
          <p
            class={classNames('invisible mt-2 text-sm', {
              '!visible mb-12 text-red-500 md:mb-0': dayInvalid
            })}
          >
            {dayErrorMsg}
          </p>
        </label>
        <label class="flex flex-col items-start">
          <p
            class={classNames(
              'mb-2 text-sm font-bold uppercase tracking-widest text-smokey-grey md:tracking-[0.15em]',
              {
                'text-red-500': monthInvalid
              }
            )}
          >
            month
          </p>
          <input
            name="month"
            type="number"
            placeholder="MM"
            class={classNames(
              'peer w-24 cursor-pointer rounded-lg border-[1px] border-light-grey p-3 text-2xl font-extrabold focus-visible:outline-purple-unique md:w-36 md:p-4',
              {
                'ring-1 ring-red-500': monthInvalid
              }
            )}
          />
          <p
            class={classNames('invisible mt-2 text-sm', {
              '!visible mb-12 text-red-500 md:mb-0': monthInvalid
            })}
          >
            {monthErrorMsg}
          </p>
        </label>
        <label class="flex flex-col items-start">
          <p
            class={classNames(
              'mb-2 text-sm font-bold uppercase tracking-widest text-smokey-grey md:tracking-[0.15em]',
              {
                'text-red-500': yearInvalid
              }
            )}
          >
            year
          </p>
          <input
            name="year"
            type="number"
            placeholder="YYYY"
            class={classNames(
              'peer w-24 cursor-pointer rounded-lg border-[1px] border-light-grey p-3 text-2xl font-extrabold focus-visible:outline-purple-unique md:w-36 md:p-4',
              {
                'ring-1 ring-red-500': yearInvalid
              }
            )}
          />
          <p
            class={classNames('invisible mt-2 text-sm', {
              '!visible mb-12 text-red-500 md:mb-0': yearInvalid
            })}
          >
            {yearErrorMsg}
          </p>
        </label>
      </div>
      <div class="relative flex flex-row md:mt-8">
        <div class="w-full border-y-[1px] border-light-grey" />
        <div class="absolute inset-y-0 right-[7.5rem] flex items-center md:right-0">
          <button type="submit">
            <img
              src={icon}
              alt=""
              class="h-14 w-14 cursor-pointer rounded-full bg-purple-unique p-4 duration-100 ease-in hover:bg-black md:h-20 md:w-20 md:p-5"
            />
          </button>
        </div>
      </div>
    </form>
    <div class="flex flex-col space-y-2 pb-0 pl-0 pr-0 pt-10 md:pb-8 md:pr-8 md:pt-8">
      <div class="flex flex-row items-center space-x-4 md:space-x-8">
        {#if year}
          <p
            bind:this={yearDiv}
            class="text-6xl font-extrabold italic text-purple-unique md:text-8xl"
          >
            {year}
          </p>
          <p class="!ml-4 pb-2 text-6xl font-extrabold italic md:text-8xl">years</p>
        {:else}
          <div
            class="flex h-3 w-6 -skew-x-12 items-center justify-center bg-purple-unique md:h-5 md:w-12"
          />
          <div class="h-3 w-6 -skew-x-12 bg-purple-unique md:h-5 md:w-12" />
          <p class="pb-2 text-6xl font-extrabold italic md:text-8xl">years</p>
        {/if}
      </div>
      <div class="flex flex-row items-center space-x-4 md:space-x-8">
        {#if month}
          <p
            bind:this={monthDiv}
            class="text-6xl font-extrabold italic text-purple-unique md:text-8xl"
          >
            {month}
          </p>
          <p class="!ml-4 pb-2 text-6xl font-extrabold italic md:text-8xl">months</p>
        {:else}
          <div
            class="flex h-3 w-6 -skew-x-12 items-center justify-center bg-purple-unique md:h-5 md:w-12"
          />
          <div class="h-3 w-6 -skew-x-12 bg-purple-unique md:h-5 md:w-12" />
          <p class="pb-2 text-6xl font-extrabold italic md:text-8xl">months</p>
        {/if}
      </div>
      <div class="flex flex-row items-center space-x-4 md:space-x-8">
        {#if day}
          <p
            bind:this={dayDiv}
            class="text-6xl font-extrabold italic text-purple-unique md:text-8xl"
          >
            {day}
          </p>
          <p class="!ml-4 pb-2 text-6xl font-extrabold italic md:text-8xl">days</p>
        {:else}
          <div
            class="flex h-3 w-6 -skew-x-12 items-center justify-center bg-purple-unique md:h-5 md:w-12"
          />
          <div class="h-3 w-6 -skew-x-12 bg-purple-unique md:h-5 md:w-12" />
          <p class="pb-2 text-6xl font-extrabold italic md:text-8xl">days</p>
        {/if}
      </div>
    </div>
  </div>
</div>
