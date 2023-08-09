import React from 'react';
import navStyle from "./navbar.module.css";

const Navbar = () => {
  return (
      <div className={navStyle.navbar}>
        <div className={navStyle.heading}>
        <h1> Busybuy </h1>
        </div>

        <div className={navStyle.navbarContainer}>
            <ul>
                <li> 
                    <img src="https://www.nicepng.com/png/detail/13-131873_home-icons-png-transparent-home-icon-green-png.png" alt="home"/> 
                    <span> Home </span> 
                </li>
                
                <li> 
                    <img src="https://img.freepik.com/free-icon/login-symbol_318-9896.jpg" alt="sign-in"/> 
                    <span> Sign In </span>
                </li>

                {/* <li> 
                    <img src="https://www.pngmart.com/files/7/Cart-PNG-Clipart.png" alt="cart"/> 
                    <span> Cart </span>
                </li>

                <li> 
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABI1BMVEX///8nvsUao6M7Q1D/zjQ8O0kYp6c3QE0qNEOwsbStrrFWXWjBxMc8QU4roqozXGUnLjh+goknKDPZ2ds0O0gham7j4+S2t7r19fbKy80AusHnvDgptbw2QFAnvsDrzETy+/xXys+A1dnm9/j/zynM7vCq4uW96es4w8mh3+OR2t7b8/R509jd9PVkztPt+voqOlFywsKs2to9v7lRwLQJvcuaxYjjy1D2zTfEyGhXwK6ux3pnwaWcwH65x3AnrqejuWuBw5jYylzdy1JDrqDLwFsAmJ8wi5Q5UV11aUnWsDs4W2Yzd4BqYUtCSE+bhkTBoT5UVE2xlUE1a3WOfEbgtzphXUwyfYZhZ3CPk5l1e4IcKTtQtreVzs4iUVcnHyolPEVKqlXSAAALL0lEQVR4nN2dC3faxhLHEcKI2MbBmFBCbUeyeAgC2CalefRx33Zukua2zW3jxODk+3+KShYgCa1WO/u2/6enp3HqRb8zszM7s6ulUBAue9zt9YajieN5nnEr/z+cycmg1++64j9epGy3Pxw5RjuQkdbtz9ve5KR3J0HH/aHjockQqIY3GXRPVT8zudz+yDPI4JKYw67qRyeQ3R16ULgYZdsZaO2xtm88arw1pTN8qhokQ92RwUi3hvSGY9U0KblDTnhryJ6tmimu/oTVORGQxoku3moPPO54IWPb6auG83V6wtU9NyG9nmI+d8TfPTcYjYFKvhPBeCGjsqBj8w2feEYVgAPR/plklL6g6wuKn9mME6nLOXcime9WEkPOQAGeIdFVx7IdNMZ4IgNwoIzPkGJG11EJGDAOxQL2FfMFiI7IoDpSD+irLWw97qoLMUmJCjh91WCR2o6IxpzSGJoW/5iqxxSMxHsy2qqTRFp804brqeZBqD3iB/hUNQxabYcXYJebh86MZ999dzzjNVzbsfkA8nogo/398xel0pOXr3gx8kHkZsHZqyedUqBO5wduZvTYEfm56I8h3y3jS16DsiPyA3z2ohSp8xM3KzpsiPyi6OznTimO+DdeA7NF1DGvxzCM4wRgqfP3Q14jsyCesn74bHa80j+ShKXnxfLybwxWh6VP/TbjSmZ2/P0/n6z0orSh9d88/5k1e1Av4BhbhrMfX3Q2sZDqdF6yItL1xBk3JWabfolj/BcbodGmKaZ6jHniGTmgj8i8BoA3b1gT4ewlhLBU+jcjoQcFZA6jx6nQgjfiT2W2zwMHVIfmUw5jegUzYek/F8XYbxvwMN6GbWsMoT7qHV5+eG1WzZWO/gskfHNWjX779dt3e3BEyMEG+CR8Z27FntAn/AVMGPtts7q19XYPakfAVLShQ+9Vt8wNvQfOw/+dbQxQ3foAfAzAVISm+ssUn2me/Qoz4m9HqSG23kIRSftv0M2JPQSgefQbyIS/b5rwFvEhENGwiQChieLQrCKezjwDxJrOGxSgj/gO+CwTMh8FjvoBCegj/vItGWOn9Csa0Ee8gD0LkZ9CffQQ5aOho1r/f/Ntvv74/c8sQLP6AboQyPdTcMn0MZPQN+PZUb78/yl7hGoRhkiwLQWtKLzXGU7KR1uXUMS8KuMpNNfHnNSq8FIjInxXBiLm5X0HCBhLFdbOAS9trxH9iViEIeZUw/DlWpwwdwqQareyJnzoEwKtiB0avqSXQghCxHZtKOp6OYQwK2bX+zTNNUmEEERMxqDZqpdFCELMMiK0aJJLCEHMKqOoTlvIIwQgtjMOo1DwSSUkR8yYiXQNUpmEACsijUi3SyGVkBgRmRMpW8B4wmaTLyExImprGFr4khDuViq7fAlJERGl8Jiyi48jPKhYlU+cCUkR09um4B5wPmHrvWU1DngTEiKm+8N0fFjCq4ZJ56R4QkLEzYRBfbwZSbjd8J1zv2KufLT5DZFaZIRkiO0NQocSEEnYOvLn37YP+Hn5g+b2AxKREhIhbsSaU+rdQqQNff9s+P/stECE28SERIjJ3in9hi+SsLXT8P9srZNhc/cxicgJiRATFYZDC5gRaVpmw6pQhVFCQgLERMPGpQbMiqWtHesbakASQgLEuJsynErIyhatVoFeJIT5iPEainLFhiNkEhFhLmLMTamKe/WEuYiRm7K8zYQnPHgskjAPMUr6J/SAeMIH19cPRBLmIEZ7GAyAWMLH0bpNECEecV0HuyzHnzCETT/pm1QlMDkhHnG1S8P0UmFGxg/+5S9sKmLnYS7iMl+MGADRhJ+s/ULhc8W83l4CN4lERYhDXE1EpoOyyNrCX7Ltf/In4f7yB81tIgHWpWSIy4nIsGTLIAzMF9QWV4U1Id/qiRgxzIhs5yzRtcVVUFu8b0WEIm2IQQxbbrQdGgxhEGWsSiyMtohENw9xiOEeDcOiNJuwdWXStWjoCLMQw0Kf7US+ynVpPuJtqGELNNoQZiAGoQZ8vkRTQjRisKphPJOPJ9wV0S+FILZt1lCKJ9y+Xq1qZBCiEINgyrRmwxPuiq8t8hCDdZsjjPCgYsWyvgzCNGLQyWB8fQtNGCT71nvLpOwoUhOmENuDgs34bgy6tqhc3Ta+rymzPj1hCnHE0M/PJgxqi8+fYpOQ884MBNFhTYdoG+5XTMuvLVYbM6JrCxyix/wGF3oe+uWT/+cWjJC+tsAhMt+LlBFLryrx2qJFtDETdTzYCJOIzK8ZZmWLzzv0GzOshAlEYYRMYiWMIzJfHaQnYQyRdVmqK2GEWBiyAWpLuEZk2rPQmnCFeI8Jl4isxZPOhCHifbZhiHi/CQNEObFU6M5MDqKcfCi6q49DlLOmkVo9bUjOulShDSURCt+ZwREKqg/ZxJVQTI2vE6GQPo1GhGUhvTadCOdi+qUaEZ4L6nnrQ7gQuW+hBeFU6N6TDoR9sfuHGhCOBe8Bqye05ezjNx/I25lJqlyQcxZDXW1xHgwn4TwNEaGQ2mIRDCfkTFRSkndmYpoGwwk518YmfoS359oEnE3UhrBsB8MJOF+qDeE8HI/7GWF9CBfhePzPeWtDuDznLeCsvi6Ey7P6ot63UE9YXg3IAKg34WI1oLD3nlQTrt97EvfummLC9YDC3z9UtDMzj55A9Dukirr60+gJBLwHvEGopHqKvQfM/11uHWw4jz+CI5ZQzc7MNP4EnO9UYBUfwsSdCpzvxdCCcJ4c07l/hNPkmHzvp9GCcHPQe2fD881BBdwTpZYwdU+UiLu+VBLO06OKuK9NIeE0PaqQO/eUEYZNtg3dhXsTibVADXsH7r4kF/oC03tkw1SqCKX7HbQAZVwkrPk9wuwm1PwuaA4m1Ps+by4m1PlOdj4mLOh7rz5IyFy4kibfjfCYidDGju3QE5rmPi9dWQyEiBVpXOCzJ3HCBi+tASkIEUVFUtDvmUF+nRU/VW+ghLnfZgnNGHt1vQgxmWIlYMfmUCxh7RHwxgE7nxBaCtcb+c9JLav+EUaYE2ZCwb53zXtYt/KflFa1+gWIMDfM0PjpxZeaMMRG7SvMhBnfa5H2UxDi15ooxEbtC8xJiXw0EKyMuvxSq4mYi1atVv8KsiBBHF0Jtnh7VK/xZ7Qa/qD1CwggURxdCdYfvgkQaxVuSxpfwYC1+iXIRyHfJQtdn958qfFXHQiILSnSAn5V58d6nTvfDSxRACZhKGAdVXz0tc5TtRuYAYtzG0oIrffLxYuPj7jpEma/Ir6uzxKwyigXy/wExCOoKJACfvEx64uCLCJO9UlBCyl1iMAwGgn63ceqEMFhNNL4TiASFhRoPb0DiEyA8PaifESKRHi3EEHL7buIyAHQR4QRSkVkdtElorZW5ASob0RljKJxuVqubhgSfVq2o98alXqplqGRboiUi22MgJv8ohHpyiW8+iBCsYhz0tYvTK4HMqNARK4xJiHYZBSGyH8KRoJtaYhBnNO0ZMjlgtKGCETeSSItUEzljlgWEUM3NYYEHM6I57YEQF8DRVaUYsBQLqDRyA9R/AyMq0/uqpwQBYdQhAZtUkYeiBIdNJI9NAgZmRHLInM8Ti7p1gbjPUFTWxFgwDgi81Wml+oV8gU6PSHyVep7x1X5Z1z2gCSuUiHO+/kfL0f9Sb6zwhHPYUcPBMvND6zAI3gqw0uGuqMcSMD3iy20Ml8kuz/ycO5KhjjXFS+U3R1iIPMR54uxagQCub4pDTQmFrG80CZ0EmjcHzq+MVOYGYjl+aIrpn0mVLbbH44c35px0k3E8vx80XVt1c/KJHvc7fWGo4njeUvEcnk+98GmUxlofwEYPyLe3fKIkQAAAABJRU5ErkJggg==" alt="cart"/> 
                    <span> My Orders </span>
                </li>

                <li>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSak-8ASizqk4vo_tPwfUTWsmXeaswsf1fWRDqupJJm4kOdK-FEpStQ5M9qqHpgzQZGW4I&usqp=CAU" alt="sign-out"/>
                    <span> Sign Out </span>
                </li> */}

            </ul>
        </div>
      </div>
  )
}

export default Navbar;
